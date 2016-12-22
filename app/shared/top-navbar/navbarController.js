/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller("navbarController", function($scope, $location){
    //a simple debugging variable to make sure we are in the right controller
    $scope.name = 'navbarController name';

    $scope.refresh = function() {
        location.reload();
    };
    $scope.showBack = function() {
        return $location.path == '/Admin';
    };

    $scope.go = function (path) {
        $location.path(path);
    };

    $scope.back = function () {
        window.history.back();
    };

    $scope.isActive = function (route) {
        return route === $location.path();
    };
});
