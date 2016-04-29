/// <vs />
'use strict';

// Load resource requirements
var fs = require('fs');
var mainBowerFiles = require('main-bower-files');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});

// command line options 
var options = {
    dest: $.util.env.dest ? $.util.env.dest : './build/',
    date: $.util.env.date ? $.util.env.date : Date.now(), 
    throw: $.util.env.throw ? true : false,
    type: $.util.env.type ? $.util.env.type.toLowerCase() : 'debug',
    version: $.util.env.version ? $.util.env.version : 'debug',
    stripePk: $.util.env.stripepk ? $.util.env.stripepk : ''
};

// less autoprefix workaround plugin (https://github.com/less/less.js/issues/2413)
// has a bug that adds unnamed css files at root of sourcemaps (ex. <input css 1>)
var lessPluginAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new lessPluginAutoprefix({ browsers: ["last 2 versions"] });

// retreive values from shared assembly file if possible
try {

    // retreive version if $.util.env.version undefined
    if ($.util.env.version === undefined) {
        var fileContent = fs.readFileSync('../Properties/SharedAssemblyInfo.cs', 'utf-8');
        var start = fileContent.indexOf('AssemblyInformationalVersion') + 30;
        var end = fileContent.indexOf(')', start) -1;
        options.version = fileContent.substring(start, end);
    }

    // retreive stripe public key if $.util.env.stripepk undefined
    if ($.util.env.stripepk === undefined) {

        // set Web.config file name based on build type
        var fileName = "Web." + options.type.charAt(0).toUpperCase() + options.type.slice(1) + ".config";

        // get web config file contents
        var fileContent = fs.readFileSync(fileName, 'utf-8');

        // get start and end of key value
        var start = fileContent.indexOf('value=', fileContent.indexOf('StripeApiKey')) + 7;
        var end = fileContent.indexOf('"', start);

        // set public key
        options.stripePk = fileContent.substring(start, end);
    }

} catch (e) { }

/**
 *  Default task that launches the clean the
 *  main optimization build tasks
 */
gulp.task('default', ['clean'], function () {
  gulp.start('build');
});

/**
 *  Clean the build directory
 */
gulp.task('clean', function() {
    return gulp.src(
            [
                options.dest,
                './fonts/'
            ], { read: false })
        .pipe($.clean());
});

/**
 *  Build all third-party and app scripts and styles
 */
gulp.task('build', ['appTemplates', 'appScripts', 'appStyles', 'libScripts', 'libStyles', 'libLocale', 'libFonts']);

/**
 *  Concatenates and registers all template files
 */
gulp.task('appTemplates', function () {

    // filter options
    var htmlFilter = $.filter('**/*.html');

    // source bower files
    var sourceFiles = mainBowerFiles();

    // source app files
    sourceFiles.push(
        './Components/**/*.html',
        './Directives/**/*.html');

    // note, gulp-angular-templatecahce does not handle src.base properly
    // thus using builtin root prefix to add Components/ to begining of all urls 
    return gulp.src(sourceFiles, { base: './' })
        .pipe(htmlFilter)
        .pipe($.angularTemplatecache('templates.js', {
                base: __dirname,
                module: 'app.templates',
                standalone: true
            }))
        .pipe(gulp.dest(options.dest));
});

/**
 *  Build all app scripts
 */
gulp.task('appScripts', function () {
    return gulp.src([
			'./app.js',
	        './Components/**/*.js',
            './Directives/**/*.js',
            './Library/library.js',
            './Services/**/*.js'
        ], { base: './' })
		.pipe($.sourcemaps.init())

            .pipe($.template({ buildDate: options.date, buildVersion: options.version, stripePk: options.stripePk }))
            .pipe($.jsvalidate()).on('error', handleError)
			.pipe($.concat('app.js'))
			.pipe(options.type === 'release' ? $.uglify() : $.util.noop())

		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(options.dest));
});

/**
 *  Build all app styles
 */
gulp.task('appStyles', function () {
    return gulp.src([
			'./Base/**/*.less',
            './Components/**/*.less',
            './Directives/**/*.less'
        ], { base: './' })
		.pipe($.sourcemaps.init())

            // less autoprefix workaround plugin (https://github.com/less/less.js/issues/2413)
            // still creates another bug that adds unnamed css files at root of sourcemaps (ex. <input css 1>)
		    .pipe($.less({ plugins: [lessAutoprefix] })).on('error', handleError)

			.pipe(options.type === 'release' ? $.cleanCss() : $.util.noop())
			.pipe($.concat('app.css'))

		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(options.dest));
});

/**
 *  Build all third-party scripts
 */
gulp.task('libScripts', function () {

    // filter options
    var jsFilter = $.filter([
        '**/*.js',
        '!bower_components/angular-i18n/**/*.js'
    ]);

    // source bower files
    var sourceFiles = mainBowerFiles();

    // source app files
    sourceFiles.push(
        './Library/**/*.js');

    return gulp.src(sourceFiles, { base: './' })
        .pipe(jsFilter)
		.pipe($.sourcemaps.init())

            .pipe($.jsvalidate()).on('error', handleError)
			.pipe($.concat('library.js'))
			.pipe(options.type === 'release' ? $.uglify() : $.util.noop())

		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(options.dest));
});

/**
 *  Build all third-party styles
 */
gulp.task('libStyles', function () {
    
    // filter options
    var cssFilter = $.filter('**/*.css');
    var lessFilter = $.filter('**/*.less', { restore: true });

    // source bower files
    var sourceFiles = mainBowerFiles([
        '**/*.css',
        '**/*.less']);

    // add library less files, wait until after less compile to add app css
    // src as less node compile coders suck at life.
    sourceFiles.push('./Library/**/*.less');

    return gulp.src(sourceFiles, { base: './' })
		.pipe($.sourcemaps.init())
            
            .pipe(lessFilter)
            .pipe($.less()).on('error', handleError)
            .pipe(lessFilter.restore)

            .pipe($.addSrc.append('./Library/**/*.css', { base: './' }))

            .pipe(options.type === 'release' ? $.cleanCss() : $.util.noop())
            .pipe($.concat('library.css'))

		.pipe($.sourcemaps.write('./'))
		.pipe(gulp.dest(options.dest));
});

/**
 *  Copy all locale files to i18n folder at dest
 */
gulp.task('libLocale', function () {

    // filter options
    var localeFilter = $.filter('bower_components/angular-i18n/**/*.js');

    return gulp.src(mainBowerFiles(), { base: './bower_components/angular-i18n/' })
		.pipe(localeFilter)
		.pipe(gulp.dest(options.dest + 'i18n'));
});

/**
 *  Copy all font-awesome fonts to fonts folder
 */
gulp.task('libFonts', function () {

    // filter options
    var fontFilter = $.filter([
        '**/*.eot',
        '**/*.svg',
        '**/*.ttf',
        '**/*.woff',
        '**/*.woff2'
    ]);

    // source bower files
    var sourceFiles = mainBowerFiles();

    // source app files
    sourceFiles.push(
        './Library/fonts/*.eot',
        './Library/fonts/*.svg',
        './Library/fonts/*.ttf',
        './Library/fonts/*.woff',
        './Library/fonts/*.woff2');

    return gulp.src(sourceFiles)
        .pipe(fontFilter)
        .pipe(gulp.dest('./fonts'));
});

/**
 *  Watch for file changes and run the appropriate task
 */
gulp.task('watch', function () {
    gulp.watch(
        [
            './Components/**/*.html',
            './Directives/**/*.html'
        ], ['appTemplates']);

    gulp.watch(
        [
            './app.js',
            './Library/library.js',
            './Directives/**/*.js',
            './Components/**/*.js',
            './Services/**/*.js'
        ], ['appScripts']);

    gulp.watch(
        [
            './Base/**/*.less',
            './Components/**/*.less',
            './Directives/**/*.less'
        ], ['appStyles']);
});

/*
 *  Gulp error callback
 */
var handleError = function (err) {
    if (options.throw) {
        throw err;
    } else {
        $.util.log($.util.colors.yellow(err));
        $.util.beep();
        this.emit('end');
    }
};