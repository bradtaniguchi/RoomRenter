(function(){
  'use strict';
  angular.module('roomRenter').controller('swapController', swapController);
  swapController.$inject = ['$log', 'constants'];

  function swapController($log, constants) {
    var vm = this;
    /*TODO: Alot of this logic should be removed and added to a service*/
    vm.srcRoomChoosen = {};
    vm.desRoomchosen = {};
    vm.srcRooms = [];
    vm.desRooms = [];
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.alertClass = "hide"; //default hides the alert
    vm.alertMessage = ""; //default no message
    vm.resetRoomChoices = resetRoomChoices;
    vm.swapRooms = swapRooms;

    return vm;

    /*function definitions*/
    function resetRoomChoices() {
      vm.srcRoomChoosen = {};
      vm.desRoomchosen = {};
    }
    function swapRooms() {
      $log.log("Swapping rooms..");
    }
    
  }

})();
