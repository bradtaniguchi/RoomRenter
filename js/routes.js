/**
 * Created by brad on 12/16/16.
 */
mainApp.config(function ($routeProvider) {
    $routeProvider.
    when('/ClockIn', {
        templateUrl: '/templates/ClockIn.html',
        controller: 'clockInController'
    }).when('/ClockOut',{
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
    }).otherwise({
        redirectTo: '/index.html',
        controller: 'mainPageController'
    });
});