/**
 * Created by brad on 12/22/16.
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
    /*manually update scope since I am to dumb to figure out how to make it work the correct way*/
    $scope.selectRoom = function(roomNumber) {
        $scope.chosenRoom = roomNumber;
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
        var currChoosenRoom = $scope.choosenRoom;
        var timeIn = new Date().toUTCString(); //change this later
        console.log("email: " + currEmail);
        console.log("id: " + currStudentID);
        console.log("room: " + currChoosenRoom);

        /*Check if entries are valid..*/

        if ($scope.toromail == "") {
            $scope.alertOpen("No Email!");
        } else if ($scope.toromail.length > 21) { //we set a strict limit on the email length
            $scope.alertOpen("Username is to long! Provide a shorter username")
            $scope.toromail = ""; //reset this field for them
        } else if ($scope.studentID == null || $scope.studentID <= 0) { //changed a value to null
            $scope.alertOpen("Bad userID!");
            $scope.studentID = null; //reset this field for them
        } else if ($scope.choosenRoom == false) {
            $scope.alertOpen("Pick a valid room!");
            //$scope.choosenRoom = 1; //reset this field for them
        } else {
            /*The user entered valid entries*/
            console.log("Valid entry, getting user from the database");
            database.getUser(currEmail, currStudentID, function(User){
                database.clockIn(User, currChoosenRoom, timeIn, function(User){
                    console.log("Clocked in user: " + JSON.stringify(User));
                    angular.element('#successModal').modal('show');
                })
            });
            /*Show Timed modal popup to confirm (1 minute)*/
            angular.element('#successModal').modal('show');
        }
    };
    buildRooms();
    console.log($scope.rooms.length);
});