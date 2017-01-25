(function(){
  'use strict';
  angular.module('roomRenter').controller('mainController', mainController);
  /*Inject dependencies*/
  mainController.$inject = ['$log', '$timeout', '$interval',
    'moment', 'constants', 'generalService'];

  function mainController($log, $timeout, $interval,
      moment, constants, generalService) {
    var vm = this;

    vm.name = "";
    vm.timesInMs = 0;
    vm.roomsVacant = 0;
    /*If we want to show the oldest room promt*/
    vm.timePrompt = "hide";
    vm.nextAvailableTime = '0';
    vm.back = back;
    vm.go = go;

    return vm;
    /*function declarations*/
    function back() {
      window.history.back();
    }
    function go(path) {
      generalService.changeView(path);
    }

  }
})();
