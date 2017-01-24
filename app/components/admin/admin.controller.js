(function(){
  'use strict';

  angular.module('roomRenter').controller('adminController', adminController);
  adminController.$inject = ['$log', 'constants', 'generalService'];

  function adminController($log, constants, generalService) {
    var vm = this;
    vm.numberofRooms = constants.NUMBER_OF_ROOMS;
    //vm.adminPassword = constantts.ADMIN_PASSWORD; //move this to a service
    vm.alertClass = "hide";
    vm.showModal = showModal;
    vm.clearDatabase = clearDatabase;
    vm.adminLogin = adminlogin;
    vm.alertClose = alertClose;
    vm.alrtOpen = alertOpen;
    vm.goModal = goModal;
    vm.go = go;

    return vm;
    /*define the functions*/

    /*Shows the modal on the page, this should be called automatically!*/
    function showModal() {
      $log.log("Showing login");
      angular.element('#loginModal').modal(
        {backdrop: 'static', keyboard:false});
    }
    function clearDatabase() {
      $log.log("Clearing the database");
      /*TODO: call database delete service*/
    }

    /*calls an admin login service, which checks the password and compares it to
    the given password*/
    function adminLogin() {
      /*add adminpassword checker service*/
      $log.log("Automatically logging in the admin");
      /*for now close the alert without checking*/
      angular.element('#loginModal').modal('hide');
    }

    /*Close the entry alert on the page*/
    function alertClose() {
      vm.alertClass = "hide";
      vm.errorMessage = "";
    }
    function alertOpen(message) {
      vm.alertClass = "";
      vm.errorMessage = message;
    }

    /*Helps us move between parts in the application*/
    function goModal(path) {
      angular.element('#successModal').modal('hide');
      /*Pause execution to make sure the modal disappears in time*/
      $timeout(function(){
        generalService.changeView(path);
      }, 500);
    }

    function go(path) {
      generalService.changeView(path);
    }
    /*see if I can open the modal first... Not known if this work*/
    //showModal();
  }
})();
