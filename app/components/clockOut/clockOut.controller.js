(function(){
  'use strict';

  angular.module('roomRenter').controller('clockOutController', clockOutController);
  clockOutController.$inject = ['$log', 'constants', 'generalService', '$timeout', 'database'];

  function clockOutController($log, constants, generalService, $timeout, database) {
    var vm = this;
    vm.room = 0;
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.usedRooms = [];
    vm.alertClass = ""; //shows the alert message if the rooms are empty
    vm.emptyMessage = "All Rooms are available!"; //only shows if there are no rooms
    vm.clockOutMessage = ""; //shows when the user clocks out of their room

    vm.go = go;
    vm.goModal = goModal;
    vm.clockOut = clockOut;
    vm.$on = buildRooms();

    return vm;

    /*function definitions*/
    function go(path) {
      generalService.changeView(path);
    }

    function goModal(path) {
      angular.element('#successModal').modal('hide');
      $timeout(function(){
        generalService.changeView(path);
      }, 500);
    }
    /*this function is not needed as it init the page, which will be done
    differently*/
    /*function getUsedRooms()
    */

    function clockOut(roomNumber) {
      $log.log("Clocking user out " + username + " " + roomNumber);
      /*TODO: should call a service for this*/
    }
    /*creates the rooms for the UI*/
    function buildRooms() {
      database.getUsersLoggedIn(function(rooms) {
        $log.log(JSON.stringify(rooms));
        vm.usedRooms = rooms;
      });
    }
  }
})();
