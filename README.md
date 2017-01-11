**RoomRenter**

A web-based solution to handling temporary room rentals.
Utilizing Nodejs, and Node-Webkit(nwjs).

---
**Branches**

We will use a basic 3 branch system. With most work being done in the
**Dev** branch. After a usable chunk of development is finished we will merge
the changes to the **Test** branch, which will be deployed to test.
If it passes the Test stage/branch, we will merge it(and any changes) to
the master/production branch.

**Master** - Current "production" branch, works as intended. If you are just
getting into the project, OR want to use the program AS-IS. Use this
branch. (We won't use releases or patches)

**Test** - Branch we will move to to test the functionality, and entire
system.

**Dev** - Branch most people will work on. Most pull/pushes will be to
this branch.

**DatabaseDev** - This Branch follows the Dev branch, but with the database
activated, so the program may only run within an nw.js window.

---
**Project Structure**

I am following [this guide](https://scotch.io/tutorials/angularjs-best-practices-directory-structure) on how to organize an AngularJS app.
We should end up with a fairly organized structure, where each component
is easily found.

app - This folder holds the files for AngularJS

  components - defined "pages" and their corresponding logic.

  database - holds the database files, and javascript service for angular.

  shared - Shared items (such as the navbar)

assets - This folder holds the usual assets for the application in general

app.route.js - This file handles the routing of the application, uses angular

app.module.js - This file setups dependences and creates the angular app.

---
**Installation**

Installation can be done with a single nodejs command:

`npm install`

If it looks like it freezes at `node scripts /install.js` give it more time.
