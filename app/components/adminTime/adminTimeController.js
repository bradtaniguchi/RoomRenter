/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('adminTimeController', function($scope) {



    $scope.roomData = [{
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

    $scope.RadioChange = function(s) {
        $scope.roomSelected = s;
    };

})