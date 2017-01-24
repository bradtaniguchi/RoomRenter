(function(){
  angular.module('roomRenter').controller('clockInController', clockInController);
  clockInController.$inject = ['$log', 'constants', '$timeout'];

  function clockInController($log, constants, $timeout) {
    var vm = this;
    vm.toromail = "";
    vm.errorMessage = "";
    vm.choosenRoom = 0;
    vm.alertClass = 'hide';
    vm.numberOfRooms = constatns.NUMBER_OF_ROOMS;
    vm.rooms = [];
    // vm.buildRooms = buildRooms;
    //vm.dynamicBuildRooms = dynamicBuildRooms;
    vm.selectRoom = selectRoom;
    vm.go = go;
    vm.alertClose = alertClose;
    vm.alertOpen = alertOpen;
    vm.submit = submit;

    return vm;
    /*function definitions*/
    /*Manually build the buttons according to how many number of rooms there are
    I may remove this function completly and put it elsewhere*/
    /*function buildRooms() {
      $log.log('building rooms!');
    }*/

    /*This builds the room buttons, but also adds flags depending on which rooms
    are currently filled, this may get moved elsewhere*/
    /*function dynamicBuildRooms() {}
    }*/

    /*Manuallly update what room we have choosen
    This should REALLY just be a component*/
    function selectRoom(roomNumber) {
      $log.log("Room choosen: " + roomNumber);
    }

    /*We only go out of a modal, so this go acts like the other controllers
    goModal function. Note it closes the modal, and awaits its closing*/
    function go(path) {
      angular.element('#successModal').modal('hide');
      $timeout(function(){
        generalService.changeView(path);
      });
    }

    function alertClose() {
      vm.alertClass = "hide";
      vm.errorMessage = "";
    }

    function alertOpen(message) {
      vm.alertClass = "";
      vm.errorMessage = message;
    }

    /*TODO: update this with a service to handle clockins*/
    function submit() {
      $log.log("Hit Submit");
    }

  }
})();
