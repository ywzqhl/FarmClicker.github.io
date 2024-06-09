// Define a controller named 'CropsController' to manage the crops view
FarmClickerApp.controller('CropsController', ['$scope', '$http', 'productivity', 'harvest', function($scope, $http, productivity, harvest){

  $scope.cropsData = {};

  // Fetch the crops data from the specified file
  $http.get('/modules/crops/CropsData.js').success(function(data) {
    $scope.cropsData = data;
  });

  // Handle the click event for purchasing a crop
  $scope.clickCrop = function(crop){
    if (harvest.getCropsHarvested() >= crop.price) {
      harvest.deductFromHarvest(crop.price);
      harvest.increaseHarvestPerClick(crop.perClick);
      crop.bought = true;
    }
  };

  // Returns the class to display if the crop is not available
  $scope.unavailable = function(crop){
    return harvest.getCropsHarvested() < crop.price ? "unavailable" : "";
  };

}]);
