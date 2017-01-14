/**
 * Created by brad on 12/22/16.
 * This file setups the project at runtime.
 * This file MUST be included first!
 */

/*Global variable to be used anytime we want to print to console.*/
var debug = true;
var numberOfRooms = 5; // set default number of rooms
var adminPassword = "fall2016@dh";

var roomRenter = angular.module('roomRenter', ['ngRoute', 'LocalForageModule', 'angularMoment']);

/*General application configurations assignment*/
roomRenter.service('appInfo', function(){
    this.debug = debug;
    this.appVersion = '0.1.19';
    this.numberOfRooms = numberOfRooms;
    this.adminPassword = adminPassword;
    this.momentFormat = 'YYYY-MM-DD HH:mm:ss'; //how we keep track of date/time in the database and UI.
});

/*This service will be moved elsewhere at a later time...*/
roomRenter.service('generalService', function($location){
    /*A function to be called to switch location within the application*/
    this.changeView = function(path) {
        console.log('Changing View' + path);
        $location.path(path);
    }
});
