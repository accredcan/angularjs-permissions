# Accreditation Canada AngularJS Permissions
[AngularJS] directive for [Accreditation Canada] website application permissions module.

##Table of Contents
- [Getting Started](#getting-started)
 - [Installation](#installation)
 - [How to Use](#how-to-use)
- [Contributing](#contributing)
 - [Prerequisites](#prerequisites)
 - [Clone Repository](#clone-repository)
 - [Directory Layout](#directory-layout)
 - [Install Dependencies](#install-dependencies)
 - [Updating Dependencies](#updating-dependencies)
 - [Building App Files](#building-app-files)
 - [Running Web Server](#running-web-server)
- [Contact](#contact)

##Getting Started

###Installation
You can use [bower] or [npm] to install into your [AngularJS] application.
```
bower install accredcan-angularjs-permissions
```

OR

```
npm install accredcan-angularjs-permissions
```

###How to Use
You can use the attributes `accredcan-permissions` and `accredcan-permissions-reverse` on any HTML element to show/hide elements based on set permissions.
```HTML
<!-- use accredcan-permissions to specifiy what permissions are required -->
<button accredcan-permissions='["admin"]'>Admin User</button>

<!-- include accredcan-permissions-reverse to reverse logic -->
<button accredcan-permissions='["admin"]' accredcan-permissions-reverse>Not Admin User</button>
```

You can use the `accredcanPermissions` service with the methods `set`, `get` and `has` permission(s).
```JavaScript
// set user permissions
accredcanPermissions.set(["user", "admin"]);

// get user permissions
var array = accredcanPermissions.get();

// has user permissions
if (accredcanPermissions.has(["admin"])
  return true;
else 
  return false;
```

##Contributing

###Prerequisites
You will need [git] to clone the template repository. We also use a number of [node.js] tools for development. You must have [node.js] and its package manager [npm] installed.

It is also recommended that you install [bower] and [gulp] globally using [npm]
```
npm install bower gulp -g
```

###Clone Repository
To get you started you can simply clone the master branch from the accredcan/angularjs-permissios repository and install the dependencies:

Clone the template repository using [git]:
```
git clone https://github.com/accredcan/angularjs-permissions.git
cd angularjs-permissions
```

If you just want to start a new project without the commit history then you can do:
```
git clone --depth=1 https://github.com/accredcan/angularjs-permissions.git <your-project-name>
```
The depth=1 tells git to only pull down one commit worth of historical data.

###Directory Layout
```
Directives/           --> app directive source code
Library/              --> app library source code (only Library.js included in app build)
Services/             --> app service source code
app.js                --> app main module source code (use as starting point)
bower.json            --> dependency package manager
gulpfile.js           --> build task manager
index.html            --> example code (turn into gh-pages)
LICENSE               --> MIT license information
package.json          --> development package manager
README.md             --> documentation
```

###Install Dependencies
We have two kinds of dependencies in this project; [npm] for server-side tools and [bower] for client-side libraries. The server-side dependencies help us manage the application development such as automated build process well the client-side dependencies are for frameworks like [AngularJS].
- We get the server-side dependencies via [npm], the node package manager.
- We get the client-side dependencies via [bower], a client-side code package manager.

We have preconfigured [npm] to automatically run [bower] so we can simply do:
```
npm install
```

Behind the scenes this will also call `bower install`. You should find that you have two new folders in the root directory.
- `node_modules` - contains the npm packages for the tools we need
- `bower_components` - contains the framework files

###Updating Dependencies
Since the framework libraries and development tools are acquired through package managers ([npm] and [bower]) you can use these tools to update the dependencies.

You can update the development tool dependencies by running:
```
npm update
```
This will find the latest versions that match the version ranges specified in the `package.json` file.

You can update the client-side dependencies by running:
```
bower update
```
This will find the latest versions that match the version ranges specified in the `bower.json` file.

###Building App Files
The build process is run using the node.js tool [gulp]. It is a task automation tool and this project has been preconfigured with all the tasks needed. You can see the full list of tasks within the root file `gulpfile.js`.

You can use gulp to build the application files by running:
```
gulp
```
This will run through the entire build process creating everything needed to run the application and place it under the `build` directory and `fonts` directory if you have any font dependencies as well. Note that the `index.html` file already references the build output.

Another very useful [gulp] command is `watch` which will allow [gulp] to automatically rebuild any part of the application that changes as you are development. You can enable this by running:
```
gulp watch
```

You can do more with gulp by running any of the following commands:
```
// clean the output directories
// ./build/*
// ./fonts/*
gulp clean

// build app html template files
// ./build/templates.js
gulp appTemplates

// build app script files
// ./build/app.js
gulp appScripts

// build app style files
// ./build/app.css
gulp appStyles

// build library script files
// ./build/lib.js
gulp libScripts

// build library style files
// ./build/lib.css
gulp libStyles

// build library locale files
// ./build/i18n/*
gulp libLocale

// build library font files
// ./fonts/*
gulp libFonts
```

###Running Web Server
You can use a local development web server like [http-server] which is a nodejs tool. You can install [http-server] globally by running:
```
npm install -g live-server
```

Then you can start your own development web server to serve static files from a folder by running:
```
live-server
```

Alternatively, you can choose to configure your own webserver, such as IIS, apache or nginx. Just configure your server to serve the files under the root directory, `./`.

##Contact
For more information on Accreditation Canada, check out https://accreditation.ca/. For more information on AngularJS please check out http://angularjs.org/. For more information on jQuery, check out https://jquery.com/.

[Accreditation Canada]: https://accreditation.ca
[AngularJS]: https://angularjs.org
[bower]: http://bower.io
[git]: https://git-scm.com
[gulp]: http://gulpjs.com
[http-server]: https://github.com/indexzero/http-server
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com
