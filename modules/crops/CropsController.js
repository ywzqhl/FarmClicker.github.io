angular.module('CropsController', [])
.controller('CropsController', function($scope, CropsData) {
    $scope.clickCount = 0; // Initialize click count

    // Function to handle touch events for multi-touch counting
    $scope.handleTouchEvent = function(event) {
        // Prevent default behavior
        event.preventDefault();

        // Count the number of touch points
        const touchPoints = event.touches.length;

        // Increase the click count by the number of touch points
        $scope.clickCount += touchPoints;

        // Trigger Angular's digest cycle to update the view
        $scope.$apply();
    };

    // Function to handle mouse click events
    $scope.increment = function() {
        $scope.clickCount++;
    };

    // Fetch crops data
    $scope.crops = CropsData;
    
    // Add event listeners for touch events on document level
    document.addEventListener('touchstart', $scope.handleTouchEvent, false);
});
