(function(){
  'use strict';
  /*Bradley Taniguchi
  *24/01/2017
  * This service handles formatting and getting different information
  * from user objects.
  */
  angular.module('roomRenter').factory('users', users);
  users.$inject = ['$log', '$localForage'];

  /*The users factory provides an interface to get the following:
  * 1. The users currently logged in
  */
  function users() {
    return {
      /*function definitions*/
      getLastLoginObject: getLastLoginObject,
      addNewEntry : addNewEntry,
    };
    function getLastLoginObject(User, callback) {
      if(callback !== undefined) {
        callback(User.entries[User.entries.length-1]);
      }
      return (User.entries[User.entries.length-1]);
    }
    function addNewEntry(User, entry, callback) {
      if(callback !== undefined) {
        User.entries.push(entry)
        callback(User);
      }
      return (User.entries.push(entry));
    }
  }
})();
