/**
 * Created by brad on 12/16/16.
 * This is the primary controller file, until further notice!
 */

/*global variables*/
var debug = true;
/*
* First lets make sure our libraries are imported to the current page correctly
*/
window.onload = function() {
    if (!window.jQuery) {
        alert("jquery isn't loaded!");
    }
    if(!window.angular) {
        alert("angularjs isn't loaded!")
    }
};
/*load the main angular app*/
var mainApp = angular.module('roomRenterApp', ["ngRoute"]);

/* Define routes for angularJS*/
/*TODO: update this to provide ACTUAL routing*/
/*mainApp.config(['$routeProvider'],
    function($routeProvider){
        $routeProvider.
            when('/ClockIn', {
                templateUrl:'templates/ClockIn.html'
        })
            .otherwise({
                redirectTo: '/index.html'
            });
    });*/

/*Define Button listeners using jquery*/
/*$(document).ready(function(){
    if (debug) console.log("Page is loaded");
    $('#testButton').on('click', function(){
       window.location = '/html/ClockIn.html';
    });
});*/
