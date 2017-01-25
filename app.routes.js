(function(){
  'use strict';
  /*
  Bradley Taniguchi
  This file handles the routes within the application
  NOTE: this setup is identical to what it was before
  */
  angular.module('roomRenter')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/Admin/Export', {
        templateUrl: 'app/components/adminExport/adminExportView.html',
        controller: 'adminExportController as vm'
    }).when('/Admin',{
        templateUrl: 'app/components/admin/adminView.html',
        controller: 'adminController as vm'
    }).when('/Admin/Stat', {
        templateUrl: 'app/components/adminStat/adminStatView.html',
        controller: 'adminStatController as vm'
    }).when('/Admin/Time',{
        templateUrl: 'app/components/adminTime/adminTimeView.html',
        controller: 'adminTimeController as vm'

    }).when('/ClockIn',{
        templateUrl: 'app/components/clockIn/clockInView.html',
        controller: 'clockInController as vm'
    }).when('/ClockOut',{
        templateUrl: 'app/components/clockOut/clockOutView.html',
        controller: 'clockOutController as vm'
    }).otherwise({
        templateUrl: 'app/components/main/mainView.html',
        controller: 'mainController as vm'
    });
  }]);
})();
