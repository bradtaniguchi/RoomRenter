/**
 * Created by brad on 1/11/17.
 */
roomRenter.controller('swapController', function($scope, database, appInfo, moment, $timeout,$rootScope){
    $scope.srcRoomchosen = {}; //room 0 is default
    $scope.desRoomchosen = {};
    $scope.srcRooms = []; //array of src rooms
    $scope.desRooms = [];
    $scope.numberOfRooms = appInfo.numberOfRooms;
    /*This is to handle emits from the mainController, when they click on the swap button,
    * we want to build the rooms again*/
    $rootScope.$on("buildButtons", function(){
        $scope.buildButtons();
    });
    /*Utility function to reset the choices*/
    var resetRoomChoices = function() {
        $scope.srcRoomchosen = {};
        $scope.desRoomchosen = {};
    };
    /*Handles the swapping of rooms in the database, by simply clocking both Users out
     then clocking them back in.*/
    $scope.swapRooms = function() {
        /*First check to make sure both rooms are picked*/
        console.log("Swapping room: " + $scope.srcRoomchosen.room + " to " + $scope.desRoomchosen.room);
        if(typeof ($scope.srcRoomchosen.room) === 'undefined' || typeof($scope.desRoomchosen.room) === 'undefined') {
            console.log("Pick both rooms!");
            /*reset choices*/
            resetRoomChoices();
        } else if($scope.srcRoomchosen.room == $scope.desRoomchosen.room){
            /*The user picked both rooms, now make sure they aren't the same one*/
            console.log("Both Rooms are the Same!");
            resetRoomChoices();
        } else {
            /*Next we need to find out if the source desRoom is filled or not, due to bad API I made the only way to do this
            * is to get all users logged in, and find which room they are in, and see if that the is the chosen one.
            * If we do not find the room amongst the logged in users, we must be selecting an empty room
            * NOTE: callback hell....*/
            database.getUsersLoggedIn(function(usernames) { //gosh my API SUCKS!
                /*We need to track how many come back, if we look into all users clocked in and didn't find it
                * we must be switching into an empty room*/
                var asyncCounter = 0;
                usernames.forEach(function(username) {
                    database.getUserLoggedIn(username, function(desUser){
                        database.getRoomLoggedIn(desUser, function(roomNumber){
                            /*Now we should async be checking to find which room is the same as the desRoom*/
                            if(roomNumber == $scope.desRoomchosen.room) {
                                /*We found the room!*/
                                console.log("Found room " + roomNumber + ", user " +desUser.username + " is in it!");
                                /*First we need to clock out the desUser*/
                                var currTime = moment().format(appInfo.momentFormat);
                                database.clockOut(desUser, currTime, function() { //capture the error here if there is one!
                                    console.log("Clocked out desUser: " + desUser.username);
                                    /*Next we also have to clock out the srcUser.. Also because of bad API we need to also get
                                     * the src User!*/
                                    database.getUserLoggedIn($scope.srcRoomchosen.username, function(srcUser) {
                                        database.clockOut(srcUser, currTime, function(){
                                            console.log("Clocked out srcUser: " + $scope.srcRoomchosen.username);
                                            database.clockIn(srcUser, $scope.desRoomchosen.room, currTime, function() {
                                                console.log("Clocked in " + srcUser.username + " into room: " +
                                                    $scope.desRoomchosen.room);
                                                /*TODO: Idk why I run into a race condition here,
                                                * I pause execution because of it.*/
                                                $timeout(database.clockIn(desUser, $scope.srcRoomchosen.room, currTime, function() {
                                                    console.log('Should see me!');
                                                    /*We clocked the des user into the Src Room*/
                                                    console.log("Clocked in " + desUser.username + " into room: "+
                                                        $scope.srcRoomchosen.room);
                                                }, 500));
                                            });
                                        });
                                    });
                                });
                            } else {
                                /*This isn't the correct room, increment the asyncCounter*/
                                asyncCounter += 1;
                            }
                            /*Finally we need to check to see if we have checked all users logged in..*/
                            if(asyncCounter == usernames.length) {
                                /*The room chosen does not have a user in it*/
                                console.log("We didn't find the user, we must have chosen an empty room");
                                /*Do stuff...*/
                            }
                        });
                    });
                });
            });
        }
        
    };

    /*Builds the list of buttons to switch on the page*/
    $scope.buildButtons = function() {
        console.log("Building rooms!");
        /*Fist we need to create the buttons for the already clocked in Src buttons*/
        database.getUsersLoggedIn(function(usernames) {
            if(usernames.length > 0) { //if there are actually users clocked in
                /*We need to get the objects for each user from the database, bad API sucks!*/
                usernames.forEach(function(username){
                    database.getUserLoggedIn(username, function(User) {
                        /*Now use a utility function from the database to get the room the user is logged into*/
                        database.getRoomLoggedIn(User, function(roomNumber){
                            /*All we need is the room number and if it is occupied
                            * For the first src rooms we only shows the ones occupied, the second row
                            * where we show where the user can GO TO, shows all rooms, but we utilize this data
                            * to show which rooms have users in it.*/
                            var usedRoom = {
                                "room" : roomNumber,
                                "username": User.username,
                                "occupied": true
                            };
                            $scope.srcRooms.push(usedRoom); //push this room onto the page
                        });
                    });
                });
                /*Now build the des rooms*/
                for(var i = 0 ; i < $scope.numberOfRooms; i++) {
                    var room = {
                        "room": i+1
                    };
                    $scope.desRooms.push(room);
                }
            } else {
                console.log("No users logged in!"); //display a popup alert
            }
        });
    };

    $scope.buildButtons();
});