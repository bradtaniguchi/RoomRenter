/**
 * Created by brad on 12/22/16.
 */


roomRenter.controller('clockOutController', function ($scope, $timeout, generalService, appInfo, database) {
    $scope.room = 0;
    $scope.numberOfRooms = appInfo.numberOfRooms;
    $scope.usedRooms = [];  //the rooms currently in use, thus the ones we are to display
    $scope.alertClass = ""; //shows the alert message if the rooms are empty
    $scope.emptyMessage= ""; //only shows if there are no rooms
    $scope.clockOutMessage = ""; //shows when the user clocks out of their room.

    $scope.clockOutStartTime = "";
    $scope.clockOutEndTime = "";
    $scope.clockOutTime = "";
    /*To provide navigation from this page*/
    $scope.go = function(path) {
        generalService.changeView(path);
    };
    $scope.goModal = function(path) {
        /*First lets remove the modal from the screen*/
        angular.element('#successModal').modal('hide');
        $timeout(function() {
            generalService.changeView(path);
        }, 500);
    };

    /*Close the entry alert on the page*/
    $scope.alertClose = function() {
        $scope.alertClass = "hide";
        $scope.emptyMessage = "";
    };

    /*Open the entry alert on the page, with the given message*/
    $scope.alertOpen = function(message){
        $scope.alertClass = "";
        $scope.emptyMessage = message;
    };

    /*To create the rooms we need to reference the database to see who is clocked in.*/
    function getUsedRooms() {
        console.log("Getting the currently Used Rooms...");
        /*Here we get the database values to be put onto the page rooms*/
        database.getUsersLoggedIn(function(Users) {
            if(Users.length > 0) {
                $scope.alertClose();
                /*Users is a list of strings, each string corresponds to a user.*/
                console.log("clockOutController: users logged in: " + JSON.stringify(Users));
                for (var i = 0 ; i < Users.length; i++) {
                    /*we first need to get the User object from the database, not just their username*/
                    database.getUserLoggedIn(Users[i], function(User) {
                        /*for each User object, we need to get their room number being used*/
                        database.getRoomLoggedIn(User, function(roomNumber){
                            /*With this information, we need to create a room for the usedRoom array*/
                            console.log("creating room logged in " + roomNumber);
                            var timeIn = database.getTimeLoggedIn(User); //lets not use async-call
                            var usedRoom = {
                                "roomNumber" : roomNumber, //this is the room the user is logged into
                                "username" : User.username, //this is the users username, to display who they are
                                "timeIn" : timeIn //this is how long the user has been in the room, use the start time
                            };
                            $scope.usedRooms.push(usedRoom); //push this room onto the page
                        });
                    });
                }
            } else { //there are no people clocked in!
                $scope.alertOpen("There are no rooms being used! Please hit cancel to go back.");
            }
        });
    }

    /*This is when the user clicks on the Clockout button.
    * We call a database function to clock the user out, and then open a confirm modal.
    * This modal will just clarify the information we got from the database.*/
    $scope.clockOut = function(username, roomNumber) {
        console.log("User" + username + " is clocking out of room: " + roomNumber);
        /*We need to get the User and their information from the database*/
        database.getUserLoggedIn(username, function(User){
            /*Now that we have their User object we need to call the database service to clock out our user.*/
            var timeOut = new Date().toUTCString();
            database.clockOut(User, timeOut, function(){ //capture the error here if there is one!
                console.log("Clocked out user: " + username);
                $scope.clockOutMessage = "Clocked User " + username + " out of room " + roomNumber;
                /*TODO: Upgrade the database to return the TIME they spent in the room, then display it here*/
            });
        });
        /*open modal*/
    };

    getUsedRooms();
});
