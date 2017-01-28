(function(){
  'use strict';
  /*Bradley Taniguchi
  *24/01/2017
  */
  angular.module('roomRenter').factory('clockIn', clockIn);
  clockIn.$inject=['$log', 'constants', 'moment', 'database'];

  function clockIn($log, constants, moment, database){
    return {
      clockIn : clockIn
    };
    /*
    Function to clockIn a user into the database
    */
    function clockIn(userID, username, room, callback){
      $log.log('User ID: '+userID, ' Username: '+ username +
        ' Room number: '+ room);
      /* First we check if the entry is a valid entry.
      IE the userID is a valid ID (all numbers) and the room is positive*/
      if(typeOf(userID)!='number') {
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
        database.getUser(function(User) {
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
                users.addUser(userID, updatedUser, function(){
                  $log.log("ClockedIn user: " + updatedUser);
                  database.addUserLoggedIn(UserID, User);
                });
              });

            });
          } else {
            /*User doesn't exist, lets create them*/
            database.addUser(userID, newEntry, function(User){
              $log.log("Created user, and clockedIn: " + User);
              database.addUserLoggedIn(UserID, User);
            });
          }//end if else
        });
      }
    }
  }
})();
