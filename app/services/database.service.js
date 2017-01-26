(function(){
  'use strict';
  /*Bradley Taniguchi
  *24/01/2017
  * This is the main database file that handles the database data structures
  * and provides the interactions to the localForage database.
  * The database structure I references is defined in the app.constants.js
  */
  angular.module('roomRenter').factory('database', database);
  database.$inject = ['$log', 'constants', '$localForage'];

  function database($log, constants, $localForage) {
    return {
      /*these are the public service functions*/
      checkDatabaseStructure: checkDatabaseStructure,
      getUser : getUser,
      getUsersLoggedIn : getUsersLoggedIn,
      createUser: createUser
    };

    /*checks to see if the database datastructure exists and calls the create
    database function if needed.*/
    function checkDatabaseStructure() {
      $localForage.getItem(constants.RESERVED_DATABASE_NAME)
        .then(function(database) {
          if(database === null) {
            /*the database doesn't exist, create it*/
            $log.log("Database structure doesn't exist, creating it");
            createDatabase();
          } else {
            $log.log('Database structure exists!');
            
          }
        }); //handle error!
    }
    /*creates the main database datastructure object
    @param {function} function to call after the creation of the database*/
    function createDatabase(callback) {
      $localForage.setItem(constants.RESERVED_DATABASE_NAME,
        constants.DATABASE_OBJECT)
        .then(function() {
          $log.log("Created database object!");
          if(callback !== undefined) {
            callback();
          }
        });
    }
    /* Clears the database, and creates the datastructure object again.
    @param {function} function to call after the deletion of the database*/
    function clearDatabase(callback) {
      $localForage.clear().then(function() {
        $log.log("Cleared the database, creating the data object..");
        createDatabase();
      });
    }
    /* gets a User object when given the name.
     returns null if there is no user within the database with that key
    */
    function getUser(username, callback) {
      $localForage.getItem(username).then(function(User) {
          if(callback !== undefined ) {
            return callback(User);
          }
      }); //capture error!
    }
    /*Gets the user objects that are in*/
    function getUsersLoggedIn(callback) {
      $localForage.getItem(constants.RESERVED_DATABASE_NAME)
        .then(function(Users){
          if(callback !== undefined) {
            return callback(Users);
          }
        }); //capture error!
    }
    /*Creates a user with the given ID
    First we check to see if there is already the User object with the given ID
    */
    function createUser(User, callback) {
      $localForage.getItem(User.userID,function(User){
        if(User !== null){
          /*The user exists and we don't need to create them*/
          $log.log('User already exists!');
        } else {
          /*Make sure the userID doesn't go over a reserved key*/
          if(constants.RESERVED_DATABASE_NAME != User.userID) {
            $localForage.setItem();
            $log.log('Creating user with ID: ' + User.userID);
          } else {
            $log.log('Given userID: ' + User.userID + ' is a reserve key!');
          }
        }
      });
    }
  }
})();
