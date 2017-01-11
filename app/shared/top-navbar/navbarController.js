/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller("navbarController", function($scope, $location, generalService, appInfo){
    //a simple debugging variable to make sure we are in the right controller
    $scope.name = 'navbarController name';
    $scope.swapMessage = '...';
    $scope.version = appInfo.appVersion;
    $scope.numberOfRooms = appInfo.numberOfRooms;
    $scope.rooms = [];

    /*Generic navbar functions*/
    $scope.refresh = function() {
        location.reload();
    };

    $scope.go = function(path) {
        generalService.changeView(path);

    };
    $scope.back = function () {
        window.history.back();
    };

    $scope.isActive = function (route) {
        return route === location.path();
    };
    /*Swap Rooms function*/
    $scope.swapRooms = function(){
        var firstRoom = 0;
        var secondRoom = 0;
        /*1. get the two rooms, and let the logic in a service to handle it.*/
    };
    function buildRooms() {
        for (var i = 0; i < $scope.numberOfRooms; i++) {
            var num = i + 1;
            var room = { //create an object
                value : num, //set room value to current iteration
                text : 'Room ' + num + ' '
            };
            $scope.rooms.push(room);
        }
    }

    buildRooms();
});
