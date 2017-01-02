/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('clockInController', function($scope, $timeout, generalService, appInfo){
    $scope.toromail = "";
    $scope.studentID;
    $scope.choosenRoom=0; //temp hardcode
    $scope.errorMessage = "";
    $scope.alertClass = 'hide'; //hide message at the start
    $scope.numberOfRooms = appInfo.numberOfRooms; //get the number of rooms the program is configed to
    $scope.rooms = [];

    function buildRooms() {
        for (var i = 0; i < $scope.numberOfRooms; i++) {
            var num = i + 1;
            var room = { //create an object
                value : num, //set room value to current iteration
                text : 'Room ' + num
            };
            $scope.rooms.push(room);
        }
    }

    /*help us move between parts in the application*/
    $scope.go = function(path) {
        angular.element('#successModal').modal('hide');
        $timeout(function(){
            generalService.changeView(path);
        }, 500);
    };

    /*Close the entry alert on the page*/
    $scope.alertClose = function() {
        $scope.alertClass = "hide";
        $scope.errorMessage = "";
    };

    /*Open the entry alert on the page, with the given message*/
    $scope.alertOpen = function(message){
        $scope.alertClass = "";
        $scope.errorMessage = message;
    };

    $scope.submit = function() {
        var currEmail = $scope.toromail;
        var currStudentID = $scope.studentID;
        var currChoosenRoom = $scope.choosenRoom;
        console.log("email: " + currEmail);
        console.log("id: " + currStudentID);
        console.log("room: " + currChoosenRoom);

        /*Check if entries are valid..*/

            if ($scope.toromail == "") {
                $scope.alertOpen("No Email!");
            }
              else if ($scope.toromail.length > 21) { //we set a strict limit on the email length
                $scope.alertOpen("Username is to long! Provide a shorter username")
                $scope.toromail = ""; //reset this field for them
            } else if ($scope.studentID == null || $scope.studentID <= 0) { //changed a value to null
                $scope.alertOpen("Bad userID!");
                $scope.studentID = null; //reset this field for them
            } else if ($scope.choosenRoom == 0) {
                $scope.alertOpen("Pick a valid room!");
                $scope.choosenRoom =1; //reset this field for them ~for testing
            } else {
                /*The user entered valid entries*/
                console.log("Valid entry, submitting to database.");
                /*Show Timed modal popup to confirm (1 minute)*/
                angular.element('#successModal').modal('show');
            }
    };
    buildRooms();
    console.log($scope.rooms.length);
});
