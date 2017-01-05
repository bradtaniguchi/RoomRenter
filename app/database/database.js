/**
 * Created by brad on 1/3/17.
 * New database file written from the ground up to focus on NoSQL.
 * Also I utilize callbacks for almost every function.
 */

roomRenter.service('database', function($localForage){
    var clockedInUsers = "clockedInUsers";
    var reserveWords = [clockedInUsers]; //these are keys that are reserved within the database
    var database = this; //this will be used during callbacks to other functions within this scope

    /*checks to see if the username is valid.
    * Currently this function ONLY checks to see if it covers the reserved key
    *   for clockedInUsers.
    * @param {string} username - the username given that needs to be checked to see if it collides with one of the
    *   reserved words.
    * TODO: update this function to check all reserved words!*/
    function isValidName(username){
        /*for (var word in reserveWords){
            if(word == username) return false;
        }*/
        return (username != clockedInUsers);
    }
    /*Updates a user's userID
    * @param {string} username - the username of the user, this is the primary key we search for.
    *   they must be UNIQUE.
    * @param {number} newUserID - the userID of the user, acts almost as a password for the user.
    *   This will overwrite the existing userID associated with the username.
    * @param {function} callback - If this argument is given, we call it after and provide it with User object
    *   we create.*/
    this.updateUserID = function(username, newUserID, callback) {
        console.log("Updating username: " + username);
        /*Get the user object from the database*/
        $localForage.getItem(username).then(function(User){ //add error handling
            User.userID = newUserID;
            $localForage.setItem(User.username, User).then(function(User){
                if(callback !== undefined) {
                    callback(User); //returns the new user (I think?)
                } else {
                    return User;
                }
            }.catch());
        });
    };
    /*Gets all the users currently defined in the clockedInUsers key array
    * @param {function} callback - If this argument is given, we provide the callback with the array of
    *   keys that the users are logged in. This data is taken directly from the database using the given key*/
    this.getUsersLoggedIn = function(callback) {
        $localForage.getItem(clockedInUsers).then(function(users){
            if(callback !== undefined) {
                callback(users);
            } else {
                return users;
            }
        });
    };
    /*Clears the local memory, use with caution!
    * @param {function} callback - If this argument is given, we call the callback function.*/
    this.clearDatabase = function(callback) {
        console.log("Cleared memory!");
        $localForage.clear().then(function() {
            buildOccupiedRooms(); //build the local key again
            if(callback !== undefined) {
                callback();
            } //call the callback if given
        });
    };
    /*quick test of functionality*/
    this.test = function(username) {
        console.log("Username given: " + username);
        /*clear memory*/
        database.clearDatabase(function(){
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
    * If they do, it just calls getUser and returns the userObject.
    * @param {string} username - the username of the user, this is the primary key we check in the database
    * @param {number} userID - the userID for the user is used if the user needs to be created. This can be thought of
    *   as a log in password for the user.
    * @param {function} callback - function to call once we get the User from the database.*/
    this.getUser = function(username, userID, callback) {
        if (!isValidName(username)){ //given username is bad!
            return null;
        }
        $localForage.getItem(username).then(function(User){
            console.log("getUser: gettingItem: " + username);
            if(User != null) { //user DOES exist
                console.log("User already exists, returning: " + User.username);
                /*validate their userID, if it is wrong then */
                callback(User); //returns User object
            } else { //user doesn't exist, lets create them
                console.log("User doesn't exist, creating : " + username);
                var newUser = {
                    "username" : username,
                    "userID" : userID,
                    "entries" : []
                };
                $localForage.setItem(username, newUser).then(function(User){
                    console.log("Created User, returning: " + User.username);
                    if(callback !== undefined) {
                        callback(User);
                    } else {
                        return User;
                    }
                });
            }
        });
    };
    /*Gets the users logged into the reserved clockedInUsers key, this data structure
    *is handled by the following functions:
    *-Startup
    *-Clockin
    *-clockout
    *This function also BUILDS the list of Users from this data structure, this way you don't have to do it manually.
    *Simply put it returns a list of objects built from the database.
    * @param {function} callback - function to return the data to
    * TODO: Spread out this function, it wont work in its current implementation
    * Do this by moving for loop to front end, and return just a list of those users.
     *
    * */
    this.getUsersLoggedIn = function(callback) {
        console.log("getUsersLoggedIn: inside function");
        $localForage.getItem(clockedInUsers).then(function(usersLoggedIn) {
            console.log("getUsersLoggedIn: got clockedInUsers: " + JSON.stringify(usersLoggedIn));
            /*var Users = [];
            for (var i = 0; i < usersLoggedIn.length; i++) {
                console.log("Looking for user1: " + usersLoggedIn[i] + "  ...");
                $localForage.getItem(usersLoggedIn[i]).then(function(userLoggedIn){
                    console.log("GOT USER: " + JSON.stringify(userLoggedIn)); //never shown!
                    Users.push(userLoggedIn); //push the user object from the database into our array
                });
            }*/
            if(callback !== undefined){
                callback(usersLoggedIn);
            } else {
                return usersLoggedIn;
            }
        });
    };
    /*This function gets a single user already logged into the system. Very similar to the getUser, but
    assumes the user is logged in, and thus does not accept the userID parameter.
    * @param {string} username - the username of the user to retrieve
    * @param {function} callback - the function to callback to once the function is done executing. It will pass
    *   the User object. If this is not provided, then the function will return the User object normally.*/
    this.getUserLoggedIn = function(username, callback) {
        $localForage.getItem(username).then(function(User){
            if(callback !== undefined) {
                callback(User);
            } else {
                return User;
            }
        });
    };
    /*Utility function that gets the room the user is in when given the User object.
    * and returns the ROOM NUMBER, not the Index!
    * NOTE: This function does not access the database.*/
    this.getRoomLoggedIn = function(User, callback) {
        var lastEntry = {}; //lastEntry should end up being an object
        /*Get the 'last' entry*/
        if (User.entries.length >= 1) {
            lastEntry = User.entries[User.entries.length-1];
        }
        /*From the last Entry get the room they are in*/
        if(callback !== undefined) {
            callback(lastEntry.room);
        } else {
            return lastEntry.room;
        }
    };
    /*Takes a User object and clocks them into the database
    * @param {Object} User - a user object defined with the following structure:
    * {
    *   "username": btaniguchi1,
    *   "userID" : 1234567890,
    *   "entries" : [{
    *       "room" : 1,
    *       "timeIn" : sometime,  //NOTE: format is still being decided
    *       "timeOut" : someOtherTime},
    *       {
    *       "room" : 2
    *       "timeIn" : sometime,  //NOTE: format is still being decided
    *       "timeOut" : null},
    *       }]
    * }
    * @param {number} room - the room the user is trying to clock into. We do no checking here,
    *   if the room is negative, or even a word we take it.
    * @param {string} timeIn - some parsable date in a string. This function does not care what the format is.
    * @param {function} callback - a function to call at the end of all database interactions.
    * */
    this.clockIn = function(User, room, timeIn, callback) {
        /*Find latest Entry in the User object*/
        User.entries.push({
            "room" : room,
            "timeIn": timeIn,
            "timeOut": null
        });
        /* Get who is already clockedIn, and add this user to it */
        database.getUsersLoggedIn(function(usersLoggedIn){
            console.log("clockin: getting usersLoggedIn");
            usersLoggedIn.push(User.username); //push our key into this array, so we know this user is logged in
            $localForage.setItem(clockedInUsers, usersLoggedIn, function() {
                console.log("set new user to clockedInUsers");
            });
            /*note there is no async callback here, since this is a separate data structure.*/
        });
        $localForage.setItem(User.username, User).then(function(data){ //add error handling
            console.log("clockin: set the Item in the database!");
            if (callback !== callback) {
                callback(data);
            } else {
                return data;
            }
        });
    };

    /*Takes a User object and clocks them out of their room at the given time
    * @param {Object} User - a user object defined with the following structure:
    * {
    *   "username": btaniguchi1,
    *   "userID" : 1234567890,
    *   "entries" : [{
    *       "room" : 1,
    *       "timeIn" : sometime,  //NOTE: format is still being decided
    *       "timeOut" : someOtherTime},
    *       {
    *       "room" : 2
    *       "timeIn" : sometime,  //NOTE: format is still being decided
    *       "timeOut" : null},
    *       }]
    * }
    * @param {string} timeOut - some parsable date string, this function does not care what format it is in.
    * @param {function} callback - a function to call at the end of this functions execution.*/
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
            if(callback != undefined) {
                callback(data);
            } else {
                return data;
            }
        });
    };
    /*Currently a debugging function, to be later repurposed to print the entire database. returns
    a string of the database contents.
    * @param {function} callback - The function to call and return with the data from the database
    * TODO: finish this function, I am to lazy to finish it right now!
    this.printDatabase = function(callback) {
        var string = "";
        $localForage.length(function(length) {
            // Loop over each of the items.
            for (var i = 0; i < length; i++) {
                // Get the key.
                $localForage.key(i, function(key) {
                    // Retrieve the data.
                    $localForage.getItem(key, function(){
                        if(key != )
                        var userString = "";
                        userString = "username " + key.username + "\n";
                    });
                });
            }
        });

        if(callback != undefined) {
            callback(data);
        } else {
            return data;
        }
    };*/

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