// Define a controller named 'StorageController' to manage the storage view
FarmClickerApp.controller('StorageController', ['$scope', '$http', 'harvest', 'storage', function($scope, $http, harvest, storage){

  // Initialize the scope variable for storage upgrades
  $scope.storageUpgrades = {};

  // Fetch the storage upgrades data from the specified file
  $http.get('/modules/storage/StorageUpgrades.js').success(function(data) {
    $scope.storageUpgrades = data;
  });

  // Get the maximum storage capacity
  $scope.getMaxStorage = function(){
    return storage.getMaxStorage();
  };

  // Get the current storage usage
  $scope.getCurrentStorage = function(){
    return storage.getCurrentStorage();
  };

  // Increase the maximum storage capacity
  $scope.increaseMaxStorage = function(amount){
    storage.increaseMaxStorage(amount);
  };

  // Handle the click event for purchasing a storage upgrade
  $scope.clickSilo = function(upgrade){
    if (harvest.getCropsHarvested() >= upgrade.price) {
      harvest.deductFromHarvest(upgrade.price);
      storage.increaseMaxStorage(upgrade.increaseStorageBy);
      upgrade.bought += 1;
      upgrade.price += upgrade.increase;
    }
  };

  // Handle the click event for using a free refill
  $scope.useFreeRefill = function(){
    storage.useFreeRefill();
  };

  // Get the number of free refills left
  $scope.getFreeRefills = function(){
    return storage.getFreeRefills();
  };

  // Reset daily refills
  storage.resetDailyRefills();

  // Returns the class to display if the upgrade is not available
  $scope.unavailable = function(upgrade){
    return harvest.getCropsHarvested() < upgrade.price ? "unavailable" : "";
  };

}]);
