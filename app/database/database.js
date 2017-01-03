/**
 * Created by brad on 1/3/17.
 * New database file written from the ground up to focus on NoSQL.
 * Also I utilize callbacks for almost every function.
 */

roomRenter.service('database', function($localForage){
    var clockedInUsers = "clockedInUsers";
    var database = this; //this will be used during callbacks to other functions within this scope

    /*checks to see if the username is valid.
    * Currently this function ONLY checks to see if it covers the reserved key
    *   for clockedInUsers.
    * Returns a boolean*/
    function isValidName(username){
        return (username != clockedInUsers)
    }
    /*Updates a user's userID*/
    this.updateUserID = function(username, newUserID, callback) {
        console.log("Updating username: " + username);
        /*Get the user object from the database*/
        $localForage.getItem(username).then(function(User){ //add error handling
            User.userID = newUserID;
            $localForage.setItem(User.username, User).then(function(User){
                callback(User); //returns the new user (I think?)
            });
        });
    };
    /*Gets all the users currently defined in the clockedInUsers key array*/
    this.getUsersLoggedIn = function(callback) {
        $localForage.getItem(clockedInUsers).then(function(users){
            callback(users);
        });
    };
    /*Clears the local memory, use with caution!*/
    this.clearData = function(callback) {
        console.log("Cleared memory!");
        $localForage.clear().then(function() {
            callback();
        });
    };
    /*quick test of functionality*/
    this.test = function(username) {
        console.log("Username given: " + username);
        /*clear memory*/
        database.clearData(function(){
            /*due to clearing ALL DATA during this test, we must manually call create the rooms*/
            buildOccupiedRooms();
            /*Then create get this user, they don't exist and should be created*/

            database.getUser(username, function(User){
                console.log("Created user: " + JSON.stringify(User));
                /*Now login...*/
                database.clockIn(User, 0, 'TIME', function(user){

                    console.log("Logged in??" + user.username + ' entires: ' + user.entries);
                    $localForage.getItem('BradT').then(function(user) {
                        console.log("Trying to get the item: " + user.username);

                    }); //manual check
                });
            });
        });
    };
    /*This function checks if the user exists, if they don't we create their record.
    * If they do, it just calls getUser and returns the userObject.*/
    this.getUser = function(username, userID, callback) {
        if (!isValidName(username)){ //given username is bad!
            return null;
        }
        $localForage.getItem(username).then(function(User){
            if(User != undefined) { //user DOES exist
                /*validate their userID, if it is wrong then */
                callback(User); //returns User object
            } else { //user doesn't exist, lets create them
                var newUser = {
                    "username" : username,
                    "userID" : userID,
                    "entries" : []
                };
                $localForage.setItem(username, newUser).then(function(User){
                    callback(User);
                });
            }
        });
    };
    /*Gets the users logged into the clockedInUsers key, this data structure is handled upon:
    startup, clockin and clockout.
    * */
    this.getUsersLoggedIn = function(callback) {
        $localForage.getItem(clockedInUsers).then(function(data) {
            callback(data);
        });
    };

    /*Takes a User object and clocks them into the database.*/
    this.clockIn = function(User, room, timeIn, callback) {
        /*Find latest Entry in the User object*/
        User.entries.push({
            "room" : room,
            "timeIn": timeIn,
            "timeOut": null
        });
        /* Get who is already clockedIn, and add this user to it */
        database.getUsersLoggedIn(function(usersLoggedIn){
            usersLoggedIn.push(User.username); //push our key into this array, so we know this user is logged in
            $localForage.setItem(clockedInUsers, usersLoggedIn);
            /*note there is no async callback here, since this is a separate data structure.*/
        });
        $localForage.setItem(User.username, User).then(function(data){ //add error handling
            callback(data);
        });
    };

    /*Takes a User object and clocks them out of their room at the given time*/
    this.clockOut = function(User, timeOut, callback) {
        var lastEntry = User.entries.length-1;
        User.entries[lastEntry].timeOut = timeOut;
        /* Get who is logged in and remove this user's username from it as they are clocking out*/
        database.getUsersLoggedIn(function(usersLoggedIn){
            var index;
            for(var i = 0; i < usersLoggedIn.length; i++) {
                if (usersLoggedIn[i] == User.username) {
                    index = i;
                }
            }
            /*remove item with splice, and apply the new changes to the array in database*/
            $localForage.setItem(clockedInUsers, usersLoggedIn.splice(index, 1));
            /*note there is no async callback here, since this is a separate data structure.*/
        });
        $localForage.setItem(User.username, User).then(function(data){ //add error handling
            callback(data);
        });
    };

    /*Add these functions at a later time for reporting*/
    /*Gets all the users logged into the rooms for the WEEK*/
    /*Gets all the users logged into the rooms for the MONTH*/
    /*Gets all the users logged into the rooms for the ALLTIME*/

    /*Checks to see if the key data structured of the occupied rooms is created, if it ISN'T we create it.*/
    function buildOccupiedRooms() {
        $localForage.getItem(clockedInUsers).then(function(data){
            if (data == null) { // the rooms don't exist!
                console.log("The " + clockedInUsers + " key doesn't exist!");
                var array = [];
                $localForage.setItem(clockedInUsers, array);
                console.log("Created the " + clockedInUsers + "key, we are ok!");
            } else {
                console.log("The " + clockedInUsers + " key already exists, we are ok!");
            }
        });
    }
    /*Check our data structure*/
    buildOccupiedRooms();
});