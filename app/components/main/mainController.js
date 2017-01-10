/**
 * Created by brad on 12/16/16.
 */

roomRenter.controller("mainController", function($scope, $location, database, $timeout, $interval, appInfo, moment) {
    $scope.name = "";
    $scope.timeInMs = 0;
    /*get the number of rooms clocked into*/
    $scope.roomsVacant = 0;
    $scope.nextAvailableTime = 0;

    $scope.back = function() {
        window.history.back();
    };

    $scope.go = function(path) {
        $location.path(path);
    };

    $scope.isActivePath = function(route) {
        return ($location.path()).indexOf(route) >= 0;
    };

    /*function to setup the vacant rooms upon page load.*/
    var getVacant = function() {
        $scope.roomsVacant = database.getUsersLoggedIn(function(Users) {
            /*The rooms vacant is defined as the number of total rooms minus how many users logged in*/
            $scope.roomsVacant = appInfo.numberOfRooms - Users.length;
        });
    };
    /*Function to get the next available time upon view load*/
    var getNextAvailableTime = function() {
        /*First we need to call the database to get who is clocked in and their times
        * NOTE: We are using the extended key version which provides their last clockIn times*/
        database.getClockedInTimes(function(clockedInTimes) {
            /*Now we need to calculate the oldest 'time' out of all the given ones
            * For now we will ASSUME that the first item in the array is the oldest, and use that */
            if(clockedInTimes != null && clockedInTimes.length > 0) {
                $scope.nextAvailableTime = moment.utc(moment.duration(moment()
                    .diff(clockedInTimes[0].timeIn, appInfo.momentFormat)).asMilliseconds())
                    .format("HH:mm");
            }
        });
    };

    var countUp = function() {
        $scope.timeInMs += 500;
        $timeout(countUp, 500);
    };

    $timeout(countUp, 500);
    var tick = function() {
        $scope.clock = Date.now();
    };
    tick();
    $interval(tick, 1000);
    getVacant();
    getNextAvailableTime();
});