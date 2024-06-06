// Define a controller named 'HarvestController' to manage the harvesting view
FarmClickerApp.controller('HarvestController', ['$scope', '$interval', 'harvest', 'storage', function($scope, $interval, harvest, storage){

  // Get the path to the harvest button image
  $scope.getHarvestCropButton = function(){
    return harvest.getHarvestCropButton();
  };

  // Get the number of crops harvested
  $scope.getCropsHarvested = function(){
    return harvest.getCropsHarvested();
  };

  // Get the number of crops harvested per second
  $scope.getHarvestPerSec = function(){
    return harvest.getHarvestPerSec();
  };

  // Harvest crops when the button is clicked
  $scope.harvestCrops = function(){
    var harvestAmount = harvest.getHarvestPerClick();
    if (storage.getCurrentStorage() >= harvestAmount) {
      storage.decreaseCurrentStorage(harvestAmount);
      harvest.harvestCrops();
    }
  };

  // Automatically refill the current storage every second
  $interval(function() {
    storage.autoRefillStorage(harvest.getHarvestPerSec());
  }, 1000);

  // Update the last online time when the player logs in or re-enters the page
  storage.updateLastOnlineTime();

}]);
