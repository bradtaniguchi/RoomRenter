/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('adminExportController', function($scope, moment, database){
    $scope.message = "[Database Message Building...]";
    $scope.alertClass = "hide"; //Default starts as hide

    /*sorting function to pass to sort function.*/
    var sortBySeconds = function(a,b) {
        if(moment(a) < moment(b)) return -1;
        if(moment(a) > moment(b)) return 1;
        return 0;
    };

    /*Close the entry alert on the page*/
    $scope.alertClose = function() {
        $scope.alertClass = "hide";
    };

    /*Open the entry alert on the page, with the given message*/
    $scope.alertOpen = function() {
        $scope.alertClass = "";
    };

    /*Builds the database message*/
    $scope.buildMessage = function() {
        /*call the database to get a list of all entries*/
        $scope.message = "[Database Message Building...]"; //change back to default while we load
        database.getEntries(function(entries){
            entries.sort(sortBySeconds()); //sort the array
            $scope.message = "";
            /*With the list of entry objects, 'stringify' them*/
            entries.forEach(function(entry){
                $scope.message += entry.username + ", room: " + entry.room + ", timeIn: " +
                    entry.timeIn + ", timeOut: " + entry.timeOut + "\n";
            });
        });
    };
    $scope.buildMessage();
    /*Init the copy button*/
    (function(){
        new Clipboard('#copy-button');
    })();
});
