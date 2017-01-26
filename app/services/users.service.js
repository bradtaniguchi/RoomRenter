(function(){
  'use strict';
  /*Bradley Taniguchi
  *24/01/2017
  * This service handles formatting and getting different information
  * from user objects.
  */
  angular.module('roomRenter').factory('users', users);
  users.$inject = ['$log', '$localForage', 'database'];

  /*The users factory provides an interface to get the following:
  * 1. The users currently logged in
  */
  function users() {
    return {
      /*fuction definitions*/
      /*getUsersLoggedIn: gets the users currently logged in by checking the
      datbase config datastructure
      @returns {array} an array of User objects that are currently logged in*/
      getUsersLoggedIn: function(){
        $log.log('Getting the users logged in...');
        return [];
      },


    };
  }
})();
