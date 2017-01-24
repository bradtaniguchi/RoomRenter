(function(){
  'use strict';

  angular.module('roomRenter').controller('clockOutController', clockOutController);
  clockOutController.$inject = ['$log', 'constants', 'generalService', '$timeout'];

  function clockOutController($log, constats, generalService, $timeout) {
    var vm = this;
    vm.room = 0;
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.usedRooms = [];
    vm.alertClass = ""; //shows the alert message if the rooms are empty
    vm.emptyMessage = ""; //only shows if there are no rooms
    vm.clockOutMessage = ""; //shows when the user clocks out of their room

    /*these variables need to be updated*/
    vm.clockOutStartTime = "";
    vm.clockOutEndTime = "";
    vm.clockOuttime = "";

    vm.go = go;
    vm.goModal = goModal;
    vm.alertClose = alertClose;
    vm.alertOpen = alertOpen;
    //vm.getUsedRooms = getUsedRooms;
    vm.clockOut = clockOut;

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
    function alertClose() {
      vm.alertClass = "hide";
      vm.emptyMessage = "";
    }
    function alertOpen() {
      vm.alertClass = "";
      vm.emptyMessage = message;
    }

    /*this function is not needed as it init the page, which will be done
    differently*/
    /*function getUsedRooms()
    */

    function clockOut(username, roomNumber) {
      $log.log("Clocking user out " + username + " " + roomNumber);
      /*TODO: should call a service for this*/
    }
  }
})();
