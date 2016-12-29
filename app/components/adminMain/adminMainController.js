/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('adminMainController', function($scope, generalService, appInfo, $timeout) {
    $scope.numberOfRooms = appInfo.numberOfRooms; //get the number of Rooms
    $scope.adminPassword = "";
    $scope.alertClass = "hide"; //The default value to show the alert when loging in as the admin

    function showModal(){
        console.log("Showing login");
        angular.element('#loginModal').modal('show');
    }
    /*When the user clicks on the Login Button on the modal popup. We check their password*/
    $scope.adminLogin = function() {
        if ($scope.adminPassword == appInfo.adminPassword || appInfo.debug) {
            /*dismiss the modal*/
            angular.element('#loginModal').modal('hide');
            $scope.alertClose();
        } else {
            /*show the alert inside the modal*/
            /*Remove previous attempt*/
            $scope.adminPassword = "";
            $scope.alertOpen("Wrong password!");
        }
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

        /*help us move between parts in the application*/
    $scope.go = function(path) {
        angular.element('#successModal').modal('hide');
        $timeout(function(){
            generalService.changeView(path);
        }, 500);
    };

    /*Upon page load, we want to show the modal*/
    showModal();
});