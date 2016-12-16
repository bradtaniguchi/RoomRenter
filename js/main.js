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

var mainApp = angular.module('roomRenterApp', []);

/* Define routes for angularJS*/
mainApp.config(['$routeProvider'],
    function($routeProvider){
        $routeProvider.
            when('/ClockIn', {
                templateUrl:'templates/ClockIn.html',
                controller: 'ClockInController'
        })
            .otherwise({
                redirectTo: '/index.html'
            });
    });

/*Define Button listeners using jquery*/
$(document).ready(function(){
    if (debug) console.log("Page is loaded");
});
