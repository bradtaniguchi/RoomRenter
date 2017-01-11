/**
 * Created by brad on 12/22/16.
 */

roomRenter.controller('adminExportController', function($scope, moment, database){
    $scope.message = "[Database Message Building...]";

    /*sorting function to pass to sort function.*/
    var sortBySeconds = function(a,b) {
        if(moment(a) < moment(b)) return -1;
        if(moment(a) > moment(b)) return 1;
        return 0;
    };

    /*Builds the database message*/
    $scope.buildMessage = function() {
        /*call the database to get a list of all entries*/
        $scope.message = "[Database Message Building...]"; //change back to default while we load
        database.getEntries(function(entries){
            $scope.message = "";
            /*With the list of entry objects, 'stringify' them*/
            entries.forEach(function(entry){
                $scope.message += entry.username + ", room: " + entry.room + ", timeIn: " +
                    entry.timeIn + ", timeOut: " + entry.timeOut + "\n";
            });
        });
    };
    $scope.buildMessage();
});
