(function(){
  'use strict';
  /*Bradley Taniguchi
  *1/29/17
  */
  angular.module('roomRenter').factory('clockOut', clockOut);
  clockOut.$inject = ['$log', 'constants', 'moment', 'database', 'users'];

  function clockOut($log, constants, moment, database, users) {
    return {
      clockOut: clockOut
    };
    /*
    Function to clockOut a user from their room, and the database*/
    function clockOut(room) {
      $log.log("clocking out users from room: " + room);
      /*
      1. First we need to find the users key and object from all the objects
      in the loggedInUsers List.
      2. Next we need to go to the given key within the database and update them.
      3. Finally we remove their entry within the loggedInUsers object.
      */
      database.getUsersLoggedIn(function(Users){
        Users.forEach(function(User){
            users.getLastLoginObject(User, function(lastLogin){
              if(lastLogin.room == room) {
                /*this User is the User we need to clock out*/
                clockUserOut(User.userID, User);
              }
            });
        });
      });
    }// end clockOut function
    /*Internal function used to actually clock out a user*/
    function clockUserOut(userID, User, callback) {
      //$localForage.getItem(userID).then(function(User){
      User.entries[User.entries.length-1].clockOut = "NOW"; //update with moment
      $log.log("Updated Time, now updated item in Database...");
      $localForage.setItem(userID, User).then(function() {
        $log.log("Updated Item in Database");
        if(callback !== undefined) {
          callback();
        }
      });
      /*also remove the item from the useresLoggedIn database object*/
      $localForage.getItem(constants.RESERVED_DATABASE_NAME).then(function(databaseObject){
        /*remove the item*/
        databaseObject.usersLoggedIn.forEach(entry, index, function(){
          if(entry.userID == userID) {
            /*found the item, remove this item from the list*/
            databaseObject.usersLoggedIn = databaseObject.usersLoggedIn.splice(index, 1);
            var newDatabaseObject = databaseObject;
            $localForage.setItem(constants.RESERVED_DATABASE_NAME, newDatabaseObject).
            then(function(){
              $log.log("updated databaseObject too: " + newDatabaseObject);
            });
          }
        });
      });
    }
  }
})();
