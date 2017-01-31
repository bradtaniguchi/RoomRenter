(function(){
  'use strict';

  angular.module('roomRenter').controller('navbarController', navbarController);
  navbarController.$inject = ['$log', 'constants', 'generalService',
  '$localForage', 'database'];

  function navbarController($log, constants, generalService, $localForage, database) {
    var vm = this;
    //vm.name = "navbarController name"; //wtf does this do?
    //vm.swapMessage = "..."; //wtf does THIS do?
    vm.version = constants.APP_VERSION;
    vm.numberOfRooms = constants.NUMBER_OF_ROOMS;
    vm.rooms = [];
    vm.refresh = refresh;
    vm.go = go;
    vm.back = back;
    vm.whosClockedIn = whosClockedIn;
    vm.quickPrint = quickPrint;
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
    /*quick function to print important items in the database*/
    function quickPrint() {
      $log.log("******DEBUG PRINTOUT******");
      $localForage.getItem(constants.RESERVED_DATABASE_NAME).then(function(object){
        $log.log("Database object: " + JSON.stringify(object));
      });
      /*get ALL items in database*/
      // Find the number of items in the datastore.
      $localForage.length().then(function(length) {
          // Loop over each of the items.
          for (var i = 0; i < length; i++) {
            $localForage.key(i).then(function(key) {
              $localForage.getItem(key).then(function(item){
                 $log.log("   key: " + key + " value: "+ JSON.stringify(item));
               });
            });
          }
      });
    }
    function whosClockedIn() {
      $log.log("Getting whos logged in");
      database.getUsersLoggedIn(function(Users) {
        $log.log("users: " + JSON.stringify(Users));
        Users.forEach(function(User){
          $log.log("  user: " + JSON.stringify(User));          
        });
      });
    }
    /*theres a build rooms function, I don't need it I guess*/
  }
})();
