/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('adminMainController', function($scope, generalService, appInfo) {
    $scope.numberOfRooms = appInfo.numberOfRooms; //get the number of Rooms

    /*function to call to change the application location*/
    $scope.go = function(path) {
        generalService.changeView(path);
    };
});