/**
 * Created by brad on 12/16/16.
 */

roomRenter.controller("mainController", function($scope, $location){
    $scope.name = "";
    $scope.back = function () {
        window.history.back();
    };

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    }
});