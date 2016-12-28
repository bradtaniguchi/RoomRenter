 /**
 * Created by brad on 12/16/16.
 */

roomRenter.controller("mainController", function($scope, $location) {
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
        console.log(database.testGetTables()); //should return 2 in console!
    }

    $scope.vacant = function() {
        document.getElementById("avail").innerHTML = "1 2 3 4 5";
    }
    $scope.time = function() {
        document.getElementById("opens").innerHTML = Date();
    }

});
