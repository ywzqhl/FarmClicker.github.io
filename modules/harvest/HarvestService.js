// Define a service named 'harvest'
FarmClickerApp.service('harvest', function(){
  var harvestCropButton = "../../assets/img/oat.png"; // Path to the harvest crop button image
  var cropsHarvested = 0; // Number of crops harvested
  var harvestPerSec = 0; // Crops harvested per second
  var harvestPerClick = 1; // Crops harvested per click

  // Get the harvest crop button image path
  this.getHarvestCropButton = function(){
    return harvestCropButton;
  };

  // Get the number of crops harvested
  this.getCropsHarvested = function(){
    return cropsHarvested;
  };

  // Deduct crops from the harvested crops count
  this.deductFromHarvest = function(amount){
    cropsHarvested -= amount;
  };

  // Harvest crops, increase crops harvested per click
  this.harvestCrops = function(){
    cropsHarvested += harvestPerClick;
  };

  // Add crops to the harvested crops count
  this.addToHarvest = function(amount){
    cropsHarvested += amount;
  };

  // Get crops harvested per second
  this.getHarvestPerSec = function(){
    return harvestPerSec;
  };

  // Get crops harvested per click
  this.getHarvestPerClick = function(){
    return harvestPerClick;
  };

  // Increase crops harvested per second
  this.increaseHarvestPerSec = function(amount){
    harvestPerSec += amount;
  };

  // Increase crops harvested per click
  this.increaseHarvestPerClick = function(amount){
    harvestPerClick += amount;
  };

  // Check if an upgrade is unavailable
  this.unavailable = function(object){
    if (cropsHarvested < object.price)
      return "unavailable";
  };
});
