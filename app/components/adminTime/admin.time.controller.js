(function(){
  'use strict';
  angular.module('roomRenter').controller('adminTimeController', adminTimeController);
  adminTimeController.$inject = ['$log', 'constants', 'generalService', '$timeout',
    'database'];

  function adminTimeController($log, constants, generalService, $timeout, database) {
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
    vm.$on = buildRooms();

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

    function buildRooms() {
      $log.log('Getting used rooms');
      database.getUsersLoggedIn(function(rooms) {
        $log.log(JSON.stringify(rooms));
        vm.usedRooms = rooms;
        /*Now add the duration for each room*/
        vm.usedRooms.map(function(usedRoom){
          /*For each item add the duration item*/
          usedRoom.lastEntry.duration = "duration";
          //TODO: Add the logic to get the duration
        })
      });
    }
  }
})();
