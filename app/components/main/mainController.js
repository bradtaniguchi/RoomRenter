 /**
 * Created by brad on 12/16/16.
 */

 roomRenter.controller("mainController", function($scope, $location, database, $timeout, $interval) {
    $scope.name = "";
    $scope.back = function () {
        window.history.back();
    };

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    };

    $scope.testDatabase = function () {
        console.log(database.test()); //should return 2 in console!
    };

    $scope.roomsVacant = function () {

        document.getElementById("avail").innerHTML = 5;
    };

    $scope.timeInMs = 0;

         var countUp = function() {
             $scope.timeInMs+= 500;
             $timeout(countUp, 500);
     }

     $timeout(countUp, 500);

         var tick = function() {
             $scope.clock = Date.now();
         }
     tick();
     $interval(tick, 1000);
})

