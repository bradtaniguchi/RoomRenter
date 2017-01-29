(function(){
  angular.module('roomRenter').controller('clockInController', clockInController);
  clockInController.$inject = ['$log', 'constants', '$timeout',
    'generalService', 'database', 'clockIn'];

  function clockInController($log, constants, $timeout, generalService,
    database, clockIn) {
    var vm = this;
    vm.userID = "";
    vm.name = "";
    vm.errorMessage = "";
    vm.chosenRoom = "";
    vm.alertClass = 'hide';
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.rooms = [];
    // vm.buildRooms = buildRooms;
    //vm.dynamicBuildRooms = dynamicBuildRooms;
    vm.selectRoom = selectRoom;
    vm.go = go;
    vm.alertClose = alertClose;
    vm.alertOpen = alertOpen;
    vm.submit = submit;
    vm.$on = buildRooms();

    return vm;
    /*function definitions*/
    /*Manually build the buttons according to how many number of rooms there are
    I may remove this function completly and put it elsewhere*/
    function buildRooms() {
      $log.log('building rooms!');
      for(var i = 0; i < constants.NUMBER_OF_ROOMS; i++) {
        vm.rooms.push({
          "value" : i + 1,
          "text" : "Room: " + (i+1)
        });
      }
      /*database.getRoomsLoggedIn(function(rooms){
        vm.rooms = rooms;
      });*/
    }

    /*Manuallly update what room we have choosen
    This should REALLY just be a component*/
    function selectRoom(roomNumber) {
      $log.log("Room chosen: " + roomNumber);
      vm.chosenRoom = roomNumber;
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
      /*check to make sure all fields have been validated, otherwise open
      UI popups to prompt for different input*/
      $log.log(vm.name.toLowerCase());
      $log.log(vm.userID);
      $log.log(vm.chosenRoom);
      if(vm.name === "") {
        $log.log("No username!");
        alertOpen("No username!");
      }else if(vm.userID === "") {
        $log.log("No UserID!");
        alertOpen("No UserID!");
      } else if(vm.chosenRoom === 0) {
        $log.log("No Chosenroom!");
        alertOpen("No Choosenroom!");
      } else { //good entry
        clockIn.clockIn(vm.userID, vm.name, vm.chosenRoom);
      }
    }
  }
})();
