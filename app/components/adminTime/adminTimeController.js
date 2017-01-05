/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('adminTimeController', function($scope) {
    
$scope.userTime='07:21:00';

    $scope.userLocalTime='08:21:2016:07:21:00';
    $scope.thisTime=Date.now();


$scope.roomNum = [{

        value: '1'
    }, {
        value: '2'
    }, {
        value: '3'
    }, {
        value: '4'
    }, {
        value: '5'
    }];

})

