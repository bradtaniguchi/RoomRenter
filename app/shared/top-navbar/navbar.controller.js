(function(){
  'use strict';

  angular.module('roomRenter').controller('navbarController', navbarController);
  navbarController.$inject = ['$log', 'constants'];
  
  function navbarController($log, constants) {
    var vm = this;
    //vm.name = "navbarController name"; //wtf does this do?
    //vm.swapMessage = "..."; //wtf does THIS do?
    vm.version = constants.APP_VERSION;
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.rooms = [];
    vm.refresh = refresh;
    vm.go = go;
    vm.back = back;
    //vm.swapRooms;

    return vm;

    /*Function definitions*/
    function refresh() {
      location.reload();
    }
    function go(path)  {
      generalService.changeView(path);
    }
    function back() {
      window.history.back();
    }
    /*theres a build rooms function, I don't need it I guess*/
  }
})();
