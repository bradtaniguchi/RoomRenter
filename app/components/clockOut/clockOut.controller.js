(function(){
  'use strict';

  angular.module('roomRenter').controller('clockOutController', clockOutController);
  clockOutController.$inject = ['$log', 'constants', 'generalService',
    '$timeout', 'database', 'clockOut'];

  function clockOutController($log, constants, generalService,
    $timeout, database, clockOut) {
    var vm = this;
    vm.room = 0;
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.usedRooms = [];
    vm.alertClass = ""; //shows the alert message if the rooms are empty
    vm.emptyMessage = "All Rooms are available!"; //only shows if there are no rooms
    vm.clockOutMessage = "Clocked out of the room successfully!"; //shows when the user clocks out of their room
    vm.choosenRoom = "";

    vm.go = go;
    vm.goModal = goModal;
    vm.clockOutUser = clockOutUser;
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

    function clockOutUser(roomNumber) {
      $log.log("Clocking user out of room " + roomNumber);
      vm.choosenRoom = roomNumber;
      clockOut.clockOut(roomNumber, function(){
        $log.log("clocked out user in room: " + roomNumber);
      });
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
