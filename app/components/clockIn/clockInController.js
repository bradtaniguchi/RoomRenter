/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('clockInController', function($scope, $timeout, generalService){
    $scope.toromail = "";
    $scope.studentID = 0;
    $scope.choosenRoom = 1; //temp hardcode
    $scope.errorMessage = "";
    $scope.alertClass = 'hide'; //hide message at the start

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
        } else if($scope.toromail.length > 64) { //we set a strict limit on the email length
            $scope.alertOpen("Username is to long! Provide a shorter Username")
            $scope.toromail = ""; //reset this field for them
        } else if($scope.studentID == 0 || $scope.studentID < 0) {
            $scope.alertOpen("Bad userID!");
            $scope.studentID = 0; //reset this field for them
        } else if($scope.choosenRoom == 0) {
            $scope.alertOpen("Pick a valid room!");
            $scope.choosenRoom = 0; //reset this field for them
        } else {
            /*The user entered valid entries*/
            console.log("Valid entry, submitting to database.");
            /*Show Timed modal popup to confirm (1 minute)*/
            angular.element('#successModal').modal('show');
        }

    };
});
