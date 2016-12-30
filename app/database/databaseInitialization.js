/**
 * Created by BLUE on 12/27/2016.
 * This file creates the database connection, as a service for AngularJS.
 * TODO: Add another argument to provide database configs, to allow for a mock database
 * -We also need to decide if this is a valid way of doing things.
 * */

roomRenter.service('database', function ($localForage){
    /*Create database connection here, to be used elsewhere in the service*/

    /*Test to see if we have connected to the database correctly, returns type*/
    this.test = function(){
        return $localForage.driver();
    };

    /*Gets all users logged into the rooms as of right now.*/
    this.getUsersLoggedIn = function(){};

    /*We get a username, and see if they exist in the USER table. Return TRUE or FALSE*/
    this.checkIfExistingUser = function(username){};

    /*We get a username AND ID, IF they don't exist, we add them to the USER table.*/
    this.addUser = function(username, userID){};

    /*Adds the user with the given EMAIL, to the ENTRY database, IF and ONLY IF the user exists in the USER table.*/
    this.clockInEntry = function() {};

    /*Modifies a the USER table entry with a Clock out time parameter.*/
    this.clockOutEntry = function() {};

    /*Update the user's corresponding userID.
    * NOTE: This is used by the ADMIN, if a user forgot their ID.
    * ALSO: The user EMAIL/USERNAME is the database's primary key. NOT the userID
    *   This is done because people forget their userID all the time.
    * YOU CAN'T CHANGE THE CORRESPONDING USERNAME, just make a new one.*/
    this.updateUser = function() {};

    /*This functions will be declared, added at another time. */
    /*Gets all the users logged into the rooms for the WEEK*/
    /*Gets all the users logged into the rooms for the MONTH*/
    /*Gets all the users logged into the rooms for the ALLTIME*/
});
