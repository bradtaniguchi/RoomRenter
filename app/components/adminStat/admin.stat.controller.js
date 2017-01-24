(function() {
  'use strict';

  angular.module('roomRenter').controller('adminStatController', adminStatController);
  adminStatController.$inject = ['$log'];

  function adminStatController() {
    var vm = this;
    vm.message = "not build yet, sorry";

    return vm;
  }
})();
