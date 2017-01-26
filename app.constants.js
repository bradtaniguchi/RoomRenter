(function(){
  /*
  This file holds all constants that are used accross the application instead of
  using a service, as I had done before.
  */

  var constants = {
    "DEBUG": true,
    "APP_VERSION": "0.2.0",
    "NUMBER_OF_ROOMS": 5,
    "ADMIN_PASSWORD": "fall2016@dh",
    "MOMENT_FORMAT": "YYYY-MM-DD HH:mm:ss",
    /*the reserved key within the database*/
    "RESERVED_DATABASE_NAME":  "database",
    "DATABASE_OBJECT": { /*Database structure object*/
      "usersLoggedIn" : [], //the users logged in
    }
  };
  angular.module('roomRenter').constant('constants', constants);
})();
