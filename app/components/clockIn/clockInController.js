/**
 * Created by brad on 12/22/16.
 * This controller handles the clockIn page. The User can clock into their corresponding rooms here
 */

roomRenter.controller('clockInController', function($scope, $timeout, generalService, appInfo, database) {
    $scope.toromail = "";
    $scope.errorMessage = "";
    $scope.chosenRoom = 0;
    $scope.alertClass = 'hide'; //hide message at the start
    $scope.numberOfRooms = appInfo.numberOfRooms; //get the number of rooms the program is configed to
    $scope.rooms = [];


    function buildRooms() {
        for (var i = 0; i < $scope.numberOfRooms; i++) {
            var num = i + 1;
            var room = { //create an object
                value: num, //set room value to current iteration
                text: 'Room ' + num
            };
            $scope.rooms.push(room);
        }
    }
    /*This function builds the room buttons, but also adds a flag depending on which rooms are currently filled*/
    $scope.dynamicBuildRooms = function() {
        /*lets create the room buttons first and worry about disabling them later*/
        for (var i = 0; i < $scope.numberOfRooms; i++) {
            var num = i + 1;
            var room = { //create an object
                value: num, //set room value to current iteration
                text: 'Room ' + num,
                buttonClass: "",//default to no extra class, later it can change to disabled
                tooltipMessage : "Room is open" //default to tooltip
            };
            /*NOTE: I will add these to the scope to they appear on the page, but the next few lines of code
             * will change the $scope reference, and thus the live view MAYBE. Otherwise we need to do this step later.*/
            $scope.rooms.push(room);
        }

        /*Now lets disable some of those buttons depending on if a user is logged into it
        * First we need to get the Users clocked into the rooms first.*/
        database.getUsersLoggedIn(function(Users) {
            console.log("dynamicBuildRooms: " + JSON.stringify(Users));
            /*Then for each User we need to get the rooms they are in
            * We can do this by calling the getUserClockedIn function, NOTE this is a SINGLE user function*/
            for (var i = 0; i < Users.length; i++) {
                console.log("Trying to get " + Users[i] + " from database");
                database.getUserLoggedIn(Users[i], function(User){
                    /*With Each user object, we need to get the room they are LAST logged into*/
                    database.getRoomLoggedIn(User, function(roomNumber){
                        console.log("Disabling Room " + roomNumber + " as user " + User.username+ " is using it");
                        /*Change the button class to disabled, so the User can't select it*/
                        $scope.rooms[roomNumber-1].buttonClass = "disabled";
                        /*Provide a nice tooltip popup to the User, saying it is occupied*/
                        $scope.rooms[roomNumber-1].tooltipMessage = "Sorry this room is Occupied!";
                        console.log("This room: " + JSON.stringify($scope.rooms[roomNumber-1]));
                    });
                });
            }
        });
    };
    /*Dynamically builds the rooms on the page, can be called from scope and utilizes data from the database.
    * This function also checks to see if there are rooms being used...
    * TODO: Move this to ClockOut, I made a brain fart and made this here! When I need something ELSE*/
    // $scope.dynamicBuildRooms = function() {
    //     var rooms = []; //list of rooms we want to add to the page.
    //     /*We need to get the Users clocked into the rooms first.*/
    //     database.getUsersLoggedIn(function(Users) {
    //         /*Then for each User we need to get the rooms they are in, */
    //         for (var i = 0; i < Users.length; i++){
    //             database.getRoomLoggedIn(Users[i], function(roomNumber) {
    //                 /*Create the room Object for the list*/
    //                 var room = {
    //                     value: roomNumber,
    //                     text: 'Room ' + roomNumber
    //                 };
    //                 rooms.push(room);
    //             });
    //         }
    //         /*Now apply the rooms to the scope rooms so they can be created*/
    //         $scope.rooms.push(rooms);
    //     });
    //
    // };
    /*manually update scope since I am too dumb to figure out how to make it work the correct way*/
    $scope.selectRoom = function(roomNumber) {
        console.log("Room chosen2: " + roomNumber);
        if($scope.rooms[roomNumber-1].buttonClass !== "disabled"){
            $scope.chosenRoom = roomNumber;
        }
    };
    /*help us move between parts in the application*/
    $scope.go = function(path) {
        angular.element('#successModal').modal('hide');
        $timeout(function() {
            generalService.changeView(path);
        }, 500);
    };

    /*Close the entry alert on the page*/
    $scope.alertClose = function() {
        $scope.alertClass = "hide";
        $scope.errorMessage = "";
    };

    /*Open the entry alert on the page, with the given message*/
    $scope.alertOpen = function(message) {
        $scope.alertClass = "";
        $scope.errorMessage = message;
    };

    $scope.submit = function() {
        var currEmail = $scope.toromail;
        var currStudentID = $scope.studentID;
        var currChosenRoom = $scope.chosenRoom;
        var timeIn = new Date().toUTCString(); //change this later
        console.log("email: " + currEmail);
        console.log("id: " + currStudentID);
        console.log("room: " + currChosenRoom);

        /*Check if entries are valid..*/

        if ($scope.toromail == "") {
            $scope.alertOpen("No Email!");
        } else if ($scope.toromail.length > 21) { //we set a strict limit on the email length
            $scope.alertOpen("Username is to long! Provide a shorter username")
            $scope.toromail = ""; //reset this field for them
        } else if ($scope.studentID == null || $scope.studentID <= 0) { //changed a value to null
            $scope.alertOpen("Bad userID!");
            $scope.studentID = null; //reset this field for them
        } else if ($scope.chosenRoom == 0) {
            $scope.alertOpen("Pick a valid room!");
        } else {
            /*The user entered valid entries, check if the user is already clocked in,
            * if so display the error message*/
            database.getUsersLoggedIn(function(Users){
                var goodEntry = true; //If username is not used before flag. We assume it is ok at first.
                console.log("Inside of getUsersLogged in : " + JSON.stringify(Users));
                for(var i = 0; i < Users.length; i++) {
                    if(Users[i] == currEmail) {
                        /*open alert, user is already clocked into some room, find out to display*/
                        console.log("Invalid username: " + currEmail + " user is already clocked in");
                        $scope.alertOpen("Invalid username: " + currEmail + " user is already clocked in");
                        goodEntry = false;
                    }
                }
                if(goodEntry) {
                    console.log("Valid entry, getting user from the database");
                    database.getUser(currEmail, currStudentID, function(User){
                        console.log("Got user: " + JSON.stringify(User), " Now clocking in...");
                        database.clockIn(User, currChosenRoom, timeIn, function(User){
                            console.log("Clocked in user: " + JSON.stringify(User));
                            angular.element('#successModal').modal('show');
                        })
                    });
                    /*Show Timed modal popup to confirm (1 minute)*/
                    angular.element('#successModal').modal('show');
                }
            });
            /*TODO: if the user enters the wrong ID, */
        }
    };
    //buildRooms();
    $scope.dynamicBuildRooms();
    console.log($scope.rooms.length);
});