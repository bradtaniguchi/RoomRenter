(function(){
  'use strict';
  /*
  Bradley Taniguchi
  */
  angular.module('roomRenter')
  .controller('adminExportController', adminExportController);

  /*Inject dependencies*/
  adminExportController.$inject = ['$log', 'angularMoment'];

  function adminExportController($log, moment) {
    var vm = this;
    vm.message = "[Database Message Building...]";
    vm.alertClass = "hide"; //Default starts as hide
    vm.alertClose = alertClose;
    vm.alertOpen = alertOpen;
    vm.buildMessage = buildMessage;

    return vm;
    /*function declarations*/
    function alertClose() {
      vm.alertClass = "hide";
    }
    function alertOpen() {
      vm.alertClass = "";
    }
    function buildMessage() {
      vm.message = "DATABASE BUILT, AWAITING SERVICE";
    }
  }
  /*Init the copy button*/
  /*(function(){
    new Clipboard('#copy-button')
  })();*/
});
