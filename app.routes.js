/**
 * Created by brad on 12/22/16.
 * This javascript file handles all the routing of the application.
 * Because its a node-webkit app, the URLs are hidden. But I have given them
 * logical names to help us during debugging. More can be added at
 * NOTE: All controllers/views are declared alphabetically.
 */
roomRenter.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/Admin/Export', {
        templateUrl: 'app/components/adminExport/adminExportView.html',
        controller: 'adminExportController'
    }).when('/Admin',{
        templateUrl: 'app/components/adminMain/adminMainView.html',
        controller: 'adminMainController'
    }).when('/Admin/Stat', {
        templateUrl: 'app/components/adminStat/adminStatView.html',
        controller: 'adminStatController'
    }).when('/Admin/Time',{
        templateUrl: 'app/components/adminTime/adminTimeView.html',
        controller: 'adminTimeController'

    }).when('/ClockIn',{
        templateUrl: 'app/components/clockIn/clockInView.html',
        controller: 'clockInController'
    }).when('/ClockOut',{
        templateUrl: 'app/components/clockOut/clockOutView.html',
        controller: 'clockOutController'
    }).otherwise({
        templateUrl: 'app/components/main/mainView.html',
        controller: 'mainController'
    });
}]);