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
    };

    $scope.roomsVacant = function() {
        if(openings=5)
        {document.getElementById("avail").innerHTML = "5";}
    };

});
