# Accreditation Canada AngularJS Permissions
[AngularJS] directive for [Accreditation Canada] website application permissions module.

##Table of Contents
- [Getting Started](#getting-started)
 - [Installation](#installation)
 - [How to Use](#how-to-use)
- [Contributing](#contributing)
 - [Prerequisites](#prerequisites)
 - [Directory Layout](#directory-layout)
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

##Contact
For more information on Accreditation Canada, check out https://accreditation.ca/. For more information on AngularJS please check out http://angularjs.org/. For more information on jQuery, check out https://jquery.com/.

[Accreditation Canada]: https://accreditation.ca
[AngularJS]: https://angularjs.org
[bower]: http://bower.io
[git]: https://git-scm.com
[node.js]: https://nodejs.org/
[npm]: https://www.npmjs.com
