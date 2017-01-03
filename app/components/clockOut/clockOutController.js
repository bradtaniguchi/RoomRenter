/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('clockOutController', function ($scope, generalService, appInfo) {
    $scope.room = "";
    $scope.numberOfRooms = appInfo.numberOfRooms;
    $scope.usedRooms = [];  //the rooms currently in use, thus the ones we are to display
    $scope.alertClass = ""; //shows the alert message if the rooms are empty
    $scope.emtpyMessage = ""; //only shows if there are no rooms
    $scope.numberOfRooms = appInfo.numberOfRooms;
    $scope.rooms = [];

    /*To provide navagation from this page*/
    $scope.go = function(path) {
        generalService.changeView(path);
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
        /*make a service call here, until then we will hard code it*/

        /*The actual database call will provide the following:
        * 1. Username
        * 2. Room
        * 3. ClockIn Time*/
        $scope.usedRooms = new Array(5); //5 rooms are in use ATM, just for a UI test
        if ($scope.usedRooms == 0) { /*There are no rooms to be clocked out of, so show a different message*/
            $scope.alertOpen("There are no rooms being used! Please hit cancel to go back.");

        } else {
            $scope.alertClose();
        }
    }

    /*This is when the user clicks on the Clockout button.
    * We call a database function to clock the user out, and then open a confirm modal.
    * This modal will just clarify the information we got from the database.*/
    $scope.clockOut = function(room) {
        console.log("Clocking out of room :" + room);
        /*call database service here*/

        /*open modal*/
    };
    getUsedRooms();

    //this function makes the rooms
    $scope.roomData = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5, isDisabled: true }
    ];

    $scope.RadioChange = function (s) {
        $scope.roomSelected = s;
    };
});





