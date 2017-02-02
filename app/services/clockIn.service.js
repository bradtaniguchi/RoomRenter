(function(){
  'use strict';
  /*Bradley Taniguchi
  *24/01/2017
  */
  angular.module('roomRenter').factory('clockIn', clockIn);
  clockIn.$inject=['$log', 'constants', 'moment', 'database', 'users',
    '$localForage'];

  function clockIn($log, constants, moment, database, users, $localForage){
    return {
      clockIn : clockIn
    };
    /*
    Function to clockIn a user into the database
    */
    function clockIn(userID, username, room, callback){
      $log.log('clockIn.Service: User ID: '+userID, ' Username: '+ username +
        ' Room number: '+ room);
      /* First we check if the entry is a valid entry.
      IE the userID is a valid ID (all numbers) and the room is positive*/
      if(typeof(userID)!='number') {
        if(callback !== undefined) {
          callback({"error":true, "errorMessage":"Entry is not a number!"});
        }
      } else if(room<=0) {
        if(callback !== undefined) {
          callback({"error":true, "errorMessage":"Room entry: " + room +
            " is invalid"});
        }
      } else {
        /*entries are good, lets check to see if the user is already logged in
        as that is faster than checking if they exist first.
        TODO: Do this later as I need to define how I enter names anyways*/
        /*database.getUsersLoggedIn(function(Users){
          $log.log("Getting users logged in..." + Users);
          Users.forEach(function(User){
          });
        });*/

        /*Now lets see if the user exists already*/
        database.getUser(userID, function(User) {
          /*Define the user object we will use*/
          var newEntry = {
            "clockIn":"NOW",
            "clockOut":null,
            "username": username,
            "room": room
          };
          if(User !== null) {
            /*User already exists within the database, so now lets
            just add an entry, first we get the user from the database, their
            last entry, update it and*/
            database.getUser(userID, function(User) {
              /*now add the entry to the userobject and add it to the database*/
              users.addNewEntry(User, newEntry, function(updatedUser){
                /*database.addUser(userID, updatedUser, function(){
                  $log.log("ClockedIn user: " + updatedUser);*/
                  $localForage.setItem(userID, updatedUser).then(function(){
                    $log.log("ClockedIn user: " + JSON.stringify(updatedUser));
                    database.addUserLoggedIn(userID, User);
                });
              });
            });
          } else {
            /*User doesn't exist, lets create them*/
            database.addUser(userID, newEntry, function(User){
              $log.log("Created user, and clockedIn: " + User);
              database.addUserLoggedIn(userID, User);
            });
          }//end if else
        });
      }
    }
  }
})();
