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
      /*function definitions*/
      getLastLogInObject: getLastLogInObject
    };
    function getLastLogInObject(User) {
      return (User.entries[User.entries.length-1]);
    }
  }
})();
