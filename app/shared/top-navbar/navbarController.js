/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller("navbarController", function($scope, $location, generalService, appInfo){
    //a simple debugging variable to make sure we are in the right controller
    $scope.name = 'navbarController name';
    $scope.swapMessage = '';
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
    }
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
    //tester for my own knowledge of how to call from JS file - Eric
    /*$scope.swapper = function() {
        //var time= new Date();
        document.getElementById("rm1").innerHTML = "hello";
    }*/

    buildRooms();
    console.log($scope.rooms.length);
});
/*
might need this later.
 <div class="btn-group" role="group" aria-label="First group">

 <button type="button" data-ng-click="swapRooms()"  id = rm1 class="btn btn-primary">Room 1</button>
 <button type="button" data-ng-click="swapRooms()"  id = rm2 class="btn btn-success">Room 2</button>
 <button type="button" data-ng-click="swapRooms()"  id = rm3 class="btn btn-info">Room 3</button>
 <button type="button" data-ng-click="swapRooms()"  id = rm4 class="btn btn-warning">Room 4</button>
 <button type="button" data-ng-click="swapRooms()"  id = rm5 class="btn btn-danger">Room 5</button>

 </div>
 */