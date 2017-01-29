(function(){
  'use strict';
  angular.module('roomRenter').controller('mainController', mainController);
  /*Inject dependencies*/
  mainController.$inject = ['$log', '$interval',
    'moment', 'constants', 'generalService', 'database'];

  function mainController($log, $interval,
      moment, constants, generalService, database) {
    var vm = this;

    vm.name = "";
    vm.now = "";
    vm.roomsVacant = 0;
    /*If we want to show the oldest room promt*/
    vm.timePrompt = "hide";
    vm.nextAvailableTime = '0';
    vm.back = back;
    vm.go = go;
    vm.$on = updateTickers();

    return vm;
    /*function declarations*/
    function back() {
      window.history.back();
    }
    function go(path) {
      generalService.changeView(path);
    }
    /*this function handles how many rooms are available, and handles
    the current time display*/
    function updateTickers() {
      /*update the current number of rooms available*/
      database.getUsersLoggedIn(function(Users){
        vm.roomsVacant =  constants.NUMBER_OF_ROOMS - Users.length;
      });
      /*update the current time function*/
      $interval(updateTimeTicker, 1000);
      /*TODO: Add another one that shows the other prompt of next time!*/

    }
    /*this function is called every second, just updates the time*/
    function updateTimeTicker() {
      vm.now = Date.now();
    }

  }
})();
