(function(){
  'use strict';
  angular.module('roomRenter').controller('adminTimeController', adminTimeController);
  adminTimeController.$inject = ['$log', 'constants', 'generalService'];

  function adminTimeController($log, constants, generalService) {
    var vm = this;
    vm.room = 0; //what is this variable?
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.usedRooms = [];
    vm.alertClass = ""; //shows the alert message if the rooms are empty
    /*shows information wells of the rooms are filled,
    if they are empty they are hidden*/
    vm.wellClass = "";
    vm.emptyMessage = "";
    vm.clockOutMessage = ""; //only shows wwhen the admin clocks someone out
    vm.go = go;
    vm.goModal = goModal;
    vm.alertClose = alertClose;
    vm.alertOpen = alertOpen;
    vm.clockOut = clockOut; //TODO: I need to  create a service for this
    //vm.getUsedRooms = getUsedRooms; //TODO: this needs to be done upfront..

    return vm;
    /*function definitions*/
    function go(path) {
      generalService.changeVie(path);
    }

    function goModal(path){
      angular.element('#successModal').modal('hide');
      $timeout(function(){
        generalService.changeView(path);
      }, 500);
    }

    function alertClose() {
      vm.alertClass = "hide";
      vm.wellClass = "";
      vm.emptyMessage = "";
    }

    function alertOpen(message) {
      vm.alertClass = "";
      vm.wellClass = "hide";
      vm.emptyMessage = message;
    }

    function clockOut(username, roomNumber) {
      /*this needs to be changed to a serivce*/
      $log.log('clocking out user: ' + username + ' ' + roomNumber);
      /*TODO: Call a databse service to clock out a user*/
    }

    function getUsedRoom() {
      $log.log('Getting used rooms');
      /*Change to database service, that gets the used rooms*/
    }
  }
})();
