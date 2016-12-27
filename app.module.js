/**
 * Created by brad on 12/22/16.
 * This file setups the project at runtime.
 * This file MUST be included first!
 */

/*Global variable to be used anytime we want to print to console.*/
var debug = true;
var roomRenter = angular.module('roomRenter', ['ngRoute']);
//var sqlite3 = require('sqlite3').verbose(); //ONLY WORKS ON NW.JS

roomRenter.service('appInfo', function(){
    this.appVersion = '0.0.7';
});

/*This service will be moved elsewhere at a later time...*/
roomRenter.service('generalService', function($location){
    /*A function to be called to switch location within the application*/
    this.changeView = function(path) {
        console.log('Changing View' + path);
        $location.path(path);
    }
});