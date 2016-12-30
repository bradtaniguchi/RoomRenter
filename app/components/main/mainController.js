 /**
 * Created by brad on 12/16/16.
 */

roomRenter.controller("mainController", function($scope, $location, database) {
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
        console.log(database.test()); //should return 2 in console!
    };

    $scope.roomsVacant = function () {

        document.getElementById("avail").innerHTML = 5;
    };

})
 thisTime = function(){

     var today = new Date();
     var h = today.getHours();
     var m = today.getMinutes();
     var s = today.getSeconds();

     h = militaryConversion(h);
     h = checkDigits(h);
     m = checkDigits(m);
     s = checkDigits(s);

     document.getElementById('currentTime').innerHTML = h + ' : ' + m + ' : ' + s;
     var t = setTimeout(thisTime, 1000);
 };
 function checkDigits(i) {
     if (i < 10) {
         i = "0" + i
     }
     ;  // add zero in front of numbers < 10
     return i;
 }

 function militaryConversion(i) {
     if (i > 12) {
         i = i - 12;
     }
     return i;
 }
