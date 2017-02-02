(function(){
  'use strict';
  /*Bradley Taniguchi
  *1/29/17
  */
  angular.module('roomRenter').factory('clockOut', clockOut);
  clockOut.$inject = ['$log', 'constants', 'moment',
    '$localForage', 'database', 'users'];

  function clockOut($log, constants, moment, $localForage, database, users) {
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
          $log.log("DEBUG: " + JSON.stringify(User));
          if(User.lastEntry.room == room) {
            clockUserOut(User.userID);
          }
        });
      });
    }// end clockOut function

    /*Internal function used to actually clock out a user*/
    function clockUserOut(userID, callback) {
      /*first we need to get the user object from the database*/
      $localForage.getItem(userID)
      .then(function(User){
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
          databaseObject.usersLoggedIn.forEach(function(entry, index){
            if(entry.userID == userID) {
              /*found the item, remove this item from the list*/
              databaseObject.usersLoggedIn.splice(index, 1);
              $localForage.setItem(constants.RESERVED_DATABASE_NAME, databaseObject)
              .then(function(){
                $log.log("updated databaseObject too: " + JSON.stringify(databaseObject));
              });
            }
          });
        });
      });
    }
  }
})();
