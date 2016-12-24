/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller("navbarController", function($scope, $location, generalService, appInfo){
    //a simple debugging variable to make sure we are in the right controller
    $scope.name = 'navbarController name';
    $scope.version = appInfo.appVersion;

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
});
