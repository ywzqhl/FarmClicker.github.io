// Define a controller named 'ProductivityController' to manage the productivity upgrades view
FarmClickerApp.controller('ProductivityController', ['$scope', '$http', 'productivity', 'harvest', function($scope, $http, productivity, harvest){

  // Initialize the scope variable for productivity upgrades
  $scope.productivityUpgrades = {};

  // Fetch the productivity upgrades data from the specified file
  $http.get('/modules/productivity/ProductivityUpgrades.js').success(function(data) {
    $scope.productivityUpgrades = data;
  });

  // Handle the click event for purchasing an upgrade
  $scope.clickUpgrade = function(upgrade){
    if (harvest.getCropsHarvested() >= upgrade.price) {
      harvest.deductFromHarvest(upgrade.price);
      harvest.increaseHarvestPerSec(upgrade.persecond);
      upgrade.bought += 1;
      upgrade.price += Math.floor(upgrade.price * upgrade.increase);
    }
  };

  // Returns the class to display if the upgrade is not available
  $scope.unavailable = function(upgrade){
    return harvest.getCropsHarvested() < upgrade.price ? "unavailable" : "";
  };

}]);
