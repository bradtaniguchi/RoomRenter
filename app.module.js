(function(){
  /*
  Bradley Taniguchi
  This file setups the entire angularjs application.
  */
  angular.module('roomRenter', ['ngRoute', 'LocalForageModule', 'angularMoment']);

  /*Lets also add the generic changeView function serivce*/
  angular.module('roomRenter').service('generalService', generalService);
  generalService.$inject = ['$log'];

  function generalService($log) {
    var vm = this;
    vm.changeView = function(path) {
      $log.log('Changing View' + path)
    }
    return vm;
  }
})();
