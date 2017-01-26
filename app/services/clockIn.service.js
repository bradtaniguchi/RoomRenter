(function(){
  'use strict';
  /*Bradley Taniguchi
  *24/01/2017
  */
  angular.module('roomRenter').factory('clockIn', clockIn);
  clockIn.$inject=['$log', 'constants', '$localForage'];

  function clockIn($log, constants, $localForage){
    return {
      clockIn : clockIn
    };
    function clockIn(userID, username, room){
      $log.log('User ID: '+userID, ' Username: '+ username, ' Room number: '+ room);

    }
  }

})();
