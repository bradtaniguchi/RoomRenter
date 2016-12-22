/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('clockInController', function($scope){
    $scope.email="";
    $scope.studentID = 0;
    $scope.errorMessage = "";
    $scope.alertClass = 'hide'; //hide message at the start

    $scope.alertClose = function() {
        $scope.alertClass = "hide";
        $scope.errorMessage = "";
    };
    $scope.submit = function() {
        var currEmail = $scope.email;
        var currStudentID = $scope.studentID;

        console.log("email: " + currEmail);
        console.log("id: " + currStudentID);

        /*Check if entries are valid..*/
        if ($scope.email == "") {
            $scope.errorMessage = "Wrong Email!";
            $scope.alertClass = "";
        } else if($scope.studentID == 0) {
            /*use jquery to toggle the error message*/
            $scope.errorMessage = "Bad userID!";
            $scope.alertClass = "";
        }
        /*Show Timed modal popup to confirm (1 minute)*/

        /*After which they either confirm or time runs out, move back to the main page.*/
    };
});
