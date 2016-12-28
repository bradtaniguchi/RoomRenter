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
            $scope.alertOpen("Wrong Email!");
        } else if($scope.studentID == 0 || $scope.studentID < 0) {
            $scope.alertOpen("Bad userID!");
        } else if($scope.choosenRoom == 0) {
            $scope.alertOpen("Pic a valid room!");
        } else {
            /*The user entered valid entries*/
            console.log("Valid entry, submitting to database.");
            /*Show Timed modal popup to confirm (1 minute)*/
            angular.element('#successModal').modal('show');
        }

    };
});
