/**
 * Created by BLUE on 12/27/2016.
 * This file creates the database connection, as a service for AngularJS.
 * TODO: Add another argument to provide database configs, to allow for a mock database
 * -We also need to decide if this is a valid way of doing things.
 * */
/*factory service that creates User objects*/
roomRenter.factory('User', function() {
    return function(username, userID){
        if (username === undefined || userID === undefined){
            return null;
        } else if (typeof userID != 'number' || userID <= 0) {
            return null;
        } else {
            this.username = username;
            this.userID = userID;
            this.entries = []; //an array of Entry objects

            /*used in the case if the user wants to update their ID*/
            this.updateID = function(newUserID) {
                this.userID = newUserID;
            };

        }
    };
});

/*factory service that creates Entry objects, that the User factory will need*/
roomRenter.factory('Entry', function(appInfo){
    return function(username, room, timeIn) { /*Create an Entry object*/
        /*If the arguments aren't given*/
        if (username === undefined || room === undefined || timeIn === undefined) {
            return null;
        } else if (room > appInfo.numberOfRooms || room <= 0){
            return null; //bad room
        } else {
            this.username = username;
            this.room = room;
            this.timeIn = timeIn;
            this.timeOut = null;

            /*Updates the timeout object*/
            this.clockout = function(timeOut){
                this.timeOut = timeOut;
            }
        }
    };
});
roomRenter.service('database', function ($localForage, User, Entry){
    /*Create database connection here, to be used elsewhere in the service*/


    /*Test to see if we have connected to the database correctly, returns type of database connection*/
    this.test = function(){
        return $localForage.driver();
    };
    /*This deletes the datastore, use with caution!*/
    this.clear = function() {
        localForage.clear();
    };
    /*Gets all users logged into the rooms as of right now.*/
    this.getUsersLoggedIn = function(){};

    /*We get a username, and see if they exist in the USER table. Return TRUE or FALSE*/
    this.checkIfExistingUser = function(username){};

    /*We get a username AND ID, IF they don't exist, we add them to the USER table.*/
    this.addUser = function(username, userID){
        /*TODO: check first, but for now just create the user*/
        console.log("adding user: " + username + " " + userID);
        //$localForage.setItem(username, User(username, userID)).then(function(){
        $localForage.setItem(username, {"username" :username, "id" : userID}).then(function(){
            $localForage.getItem(username).then(function(data) {
                console.log(data);
            });
        });

    };
    /*TODO: remove this function later*/
    this.testGetUser = function(username) {
        $localForage.getItem(username).then(function(data){
            console.log(data);
        });
    };
    /*TODO: Remove this function later
    * Temp function to get all the users logged in, test the database
    */
    this.getAllUsers = function() {
        $localForage.length(function(length){
            console.log("LENGTH: " + length);
        });
        console.log("Inside of getAllusers");
        $localForage.length(function(length){
            console.log("Inside of length...");
           for (var i = 0; i < length; i++) {
               $localForage.key(i, function(key) {
                   console.log("looking at key : " + key);
                   $localForage.getItem(key, function(user){
                       console.log("username: " + user.username);
                       console.log("userID: " + user.userID);
                       console.log("entries: " + user.entries);
                   });
               });
           }
        });
    };

    /*Adds the user with the given EMAIL, to the ENTRY database, IF and ONLY IF the user exists in the USER table.*/
    this.clockInEntry = function() {};

    /*Modifies a the USER table entry with a Clock out time parameter.*/
    this.clockOutEntry = function() {};

    /*Update the user's corresponding userID.
    * NOTE: This is used by the ADMIN, if a user forgot their ID.
    * ALSO: The user EMAIL/USERNAME is the database's primary key. NOT the userID
    *   This is done because people forget their userID all the time.
    * YOU CAN'T CHANGE THE CORRESPONDING USERNAME, just make a new one.*/
    this.updateUser = function() {};

    /*This functions will be declared, added at another time. */
    /*Gets all the users logged into the rooms for the WEEK*/
    /*Gets all the users logged into the rooms for the MONTH*/
    /*Gets all the users logged into the rooms for the ALLTIME*/
});
