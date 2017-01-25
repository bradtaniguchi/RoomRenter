/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('adminTimeController', function($scope, appInfo, $timeout, generalService, database, moment) {
    $scope.room = 0;
    $scope.numberOfRooms = appInfo.numberOfRooms;
    $scope.usedRooms = []; //the rooms currently in use, thus the ones we are to display
    $scope.alertClass = ""; //shows the alert message if the rooms are empty
    $scope.wellClass = ""; //shows the information wells if the rooms are FILLED, if they are empty they are hidden
    $scope.emptyMessage = ""; //only shows if there are no rooms
    $scope.clockOutMessage = ""; //only shows when the admin clocks someone out.

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
        $scope.wellClass = "";
        $scope.emptyMessage = "";
    };

    /*Open the entry alert on the page, with the given message*/
    $scope.alertOpen = function(message){
        $scope.alertClass = "";
        $scope.wellClass = "hide";
        $scope.emptyMessage = message;
    };

    $scope.clockOut = function(username, roomNumber) {
        console.log("User" + username + " is clocking out of room: " + roomNumber);
        /*We need to get the User and their information from the database*/
        database.getUserLoggedIn(username, function(User){
            /*Now that we have their User object we need to call the database service to clock out our user.*/
            var timeOut = moment().format(appInfo.momentFormat); //moment object
            database.clockOut(User, timeOut, function(){ //capture the error here if there is one!
                console.log("Clocked out user: " + username);
                $scope.clockOutMessage = "Clocked User " + username + " out of room " + roomNumber;
            });
        });
    };
    /*We need to create the rooms that are occupied. If they are not occupied, we do not show them.*/
    function getUsedRooms() {
        database.getUsersLoggedIn(function(Users){
            if(Users.length > 0) {
                $scope.alertClose(); //close the alert box, as there are rooms to make!
                Users.forEach(function(user) { //ah forEach I found you!
                    console.log("looking at user: " + user);
                    /*Now that we have the username, we need to get the object they represent.*/
                    database.getUserLoggedIn(user, function(User) {
                        /*for each User object, we need to get their room number being used*/
                        database.getRoomLoggedIn(User, function(roomNumber){
                            /*With this information, we need to create a room for the usedRoom array*/
                            var timeIn = database.getTimeLoggedIn(User); //not use async-call
                            /*get the duration in Hours and Minutes*/
                            var duration = moment.utc(moment.duration(moment()
                                .diff(timeIn, appInfo.momentFormat)).asMilliseconds())
                                .format("HH:mm");

                            var usedRoom = { //this data structure will appear on the UI.
                                "roomNumber" : roomNumber,
                                "username" : User.username,
                                "timeIn" : timeIn,
                                "duration": duration
                            };
                            $scope.usedRooms.push(usedRoom); //push this room onto the array that will be displayed
                        });
                    });
                });
            } else {
                $scope.alertOpen("There are no rooms being used!");
            }
        });
    }
    /*We need to call the generalService service to utilize the same clockOut that exists in the
    * clockOut scope. This way we don't re-create the same code. */
    getUsedRooms();
});
