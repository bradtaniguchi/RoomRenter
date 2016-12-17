/**
 * Created by brad on 12/16/16.
 */

mainApp.controller("mainPageController", function($scope, $location){
    $scope.name = "";
    $scope.back = function () {
        window.history.back();
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };

    $scope.isActivePath = function (route) {
        return ($location.path()).indexOf(route) >= 0;
    }
});