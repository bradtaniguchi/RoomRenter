/**
 * Created by brad on 12/22/16.
 */
roomRenter.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/ClockIn', {
        templateUrl: '/templates/ClockIn.html',
        controller: 'clockInController'
    })/*.when('/ClockOut',{
        templateUrl: '/templates/ClockOut.html',
        controller: 'clockOutController'
    }).when('/Admin', {
        templateUrl: '/templates/Admin.html',
        controller: 'adminController'
    }).when('/Admin/ViewTimes',{
        templateUrl: '/templates/ViewTimes.html',
        controller: 'viewTimesController'
    }).when('Admin/ViewStats',{
        templateUrl: '/templates/ViewStats.html',
        controller: 'viewStatsController'
    })*/.otherwise({
        templateUrl: 'app/components/main/mainView.html',
        controller: 'mainController'
    });
}]);