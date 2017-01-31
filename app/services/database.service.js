(function(){
  'use strict';
  /*Bradley Taniguchi
  *24/01/2017
  * This is the main database file that handles the database data structures
  * and provides the interactions to the localForage database.
  * The database structure I references is defined in the app.constants.js
  */
  angular.module('roomRenter').factory('database', database);
  database.$inject = ['$log', 'constants', '$localForage', 'users'];

  function database($log, constants, $localForage, users) {
    return {
      /*these are the public service functions*/
      checkDatabaseStructure: checkDatabaseStructure,
      getUser : getUser,
      addUser : addUser,
      updateUser : updateUser,
      getUsersLoggedIn : getUsersLoggedIn,
      getRoomsLoggedIn : getRoomsLoggedIn,
      addUserLoggedIn : addUserLoggedIn,
      createUser: createUser,
      clearDatabase : clearDatabase
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
        createDatabase(function(){
          if(callback !== undefined) {
            callback();
          }
        });
      });
    }
    /* gets a User object when given the name.
     returns null if there is no user within the database with that key
    */
    function getUser(userID, callback) {
      $localForage.getItem(userID).then(function(User) {
          if(callback !== undefined ) {
            callback(User);
          }
      }); //capture error!
    }
    /*Creates a User object within the database with the given userID
    Does not check if the username already exists!*/
    function addUser(userID, firstEntry, callback) {
      $localForage.setItem(userID, {"entries":[firstEntry]})
        .then(function(User){
          if(callback !== undefined) {
            callback(User);
          }
        }); //catch error!
    }
    /*Updates a given userID within the database.*/
    function updateUser(userID, User, callback) {
        $localForage.setItem(UserID, User).then(function(){
          if(callback !== undefined){
            callback();
          }
        }); //handle error!
    }
    /*Gets the user objects that are in*/
    function getUsersLoggedIn(callback) {
      $localForage.getItem(constants.RESERVED_DATABASE_NAME)
        .then(function(databaseObject){
          if(callback !== undefined) {
            return callback(databaseObject.usersLoggedIn);
          }
        }); //capture error!
    }
    /**
     * Gets JUST the room numbers in an array that are occupied. 
     * This is utilized for the clockin button creation, were we just want the rooms
     * that are occupied.
     */
    function getRoomsLoggedIn() {
      $localForage.getItem(constants.RESERVED_DATABASE_NAME).then(function(databaseObject){
        return databaseObject.usersLoggedIn.map(function(user){return user.lastEntry.room});
      });
    }
    /*Adds a user to the usersLoggedIn databaseObject.
    We apply ONLY the last User entry, which makes it easier to show on the view*/
    function addUserLoggedIn(userID, User, callback) {
      /*Lets just make sure there aren't already 5 people clocked in, if so then
      we can't add this one.*/
      $localForage.getItem(constants.RESERVED_DATABASE_NAME)
        .then(function(databaseObject) {
          if(databaseObject.usersLoggedIn.length == constants.NUMBER_OF_ROOMS) {
            $log.log("Reached max number of users clocked in!");
            if(callback !== undefined) {
              callback();
            }
          } else { //there is room!
            var newDatabaseObject = databaseObject;
            var userToEnter = {
              "userID": userID,
              "lastEntry": users.getLastLoginObject(User)
            };

            newDatabaseObject.usersLoggedIn.push(userToEnter);
            $localForage.setItem(constants.RESERVED_DATABASE_NAME,
              newDatabaseObject)
              .then(function(){
                $log.log("Added user: " + JSON.stringify(userToEnter) + " to loggedInUsers");
              });
          }

        });
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
