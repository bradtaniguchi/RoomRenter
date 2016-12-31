 /**
 * Created by brad on 12/16/16.
 */

roomRenter.controller("mainController", function($scope, $location, database, $localForage) {
    $scope.name = "";
    var openings =5;
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
        alert(database.test()); //should return 2 in console!
    };

    $scope.testDatabaseLogic = function(){
        console.log("testing database logic...");
        /*add two users*/
        database.addUser("usernameTEST", 25);
        console.log("Now getting the user object");
        database.testGetUser("usernameTEST");


    };

    $scope.roomsVacant = function() {

        document.getElementById("avail").innerHTML = openings;
    };
      $scope.display=function(){
        var refresh = 1000;
        var mytime = setTimeout(time(), refresh);
    };

    var checkTime = function(i){
        if (i < 10) {i = "0" + i;}  // add zero in front of numbers < 10
        return i;
    }
});
