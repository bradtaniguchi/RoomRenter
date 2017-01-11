/**
 * Created by brad on 1/11/17.
 */
roomRenter.controller('swapController', function($scope){
    $scope.srcRoom = 0; //room 0 is default
    $scope.desRoom = 0;

    /*Handles the swapping of rooms in the database, by simply clocking both Users out
     then clocking them back in.*/
    $scope.swapRooms = function(source, des) {
        /*First check to make sure both rooms aren't 0*/

    };

});