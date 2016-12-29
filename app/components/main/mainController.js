 /**
 * Created by brad on 12/16/16.
 */

roomRenter.controller("mainController", function($scope, $location) {
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
        console.log(database.testGetTables()); //should return 2 in console!
    };

    $scope.vacant = function() {
        document.getElementById("avail").innerHTML = "5";
    };

    $scope.time = function() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();

        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);

            document.getElementById("opens").innerHTML = h + ' : ' + m + ' : ' + s;
            //document.getElementById("opens").innerHTML = time.getMinutes();
           //display();
        var t = setTimeout(time(), 1000);

    };
      $scope.display=function(){
        var refresh = 1000;
        var mytime = setTimeout(time(), refresh);
    }

    checkTime=function(i){
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    });
