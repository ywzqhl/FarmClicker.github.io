FarmClickerApp.service('harvest', function() {
  var cropsHarvested = 0;
  var harvestPerSec = 0;
  var harvestPerClick = 1;
  var levels = [
    { name: "Bronze", level: 1, threshold: 0 },
    { name: "Silver", level: 2, threshold: 5000 },
    { name: "Gold", level: 3, threshold: 25000 },
    { name: "Platinum", level: 4, threshold: 100000 },
    { name: "Diamond", level: 5, threshold: 1000000 },
    { name: "Epic", level: 6, threshold: 2000000 },
    { name: "Legendary", level: 7, threshold: 10000000 },
    { name: "Master", level: 8, threshold: 50000000 },
    { name: "Grandmaster", level: 9, threshold: 100000000 }
  ];

  this.getCurrentLevel = function() {
    for (var i = levels.length - 1; i >= 0; i--) {
      if (cropsHarvested >= levels[i].threshold) {
        return levels[i];
      }
    }
    return levels[0];
  };

  this.getLevelProgress = function() {
    var currentLevel = this.getCurrentLevel();
    var nextLevelThreshold = levels[currentLevel.level] ? levels[currentLevel.level].threshold : currentLevel.threshold;
    var previousLevelThreshold = levels[currentLevel.level - 1] ? levels[currentLevel.level - 1].threshold : 0;
    var progress = ((cropsHarvested - previousLevelThreshold) / (nextLevelThreshold - previousLevelThreshold)) * 100;
    return progress;
  };

  this.getHarvestCropButton = function(){
    return "../../assets/img/oat.png";
  };

  this.getCropsHarvested = function(){
    return cropsHarvested;
  };

  this.deductFromHarvest = function(amount){
    cropsHarvested -= amount;
  };

  this.harvestCrops = function(){
    cropsHarvested += harvestPerClick;
  };

  this.addToHarvest = function(amount){
    cropsHarvested += amount;
  };

  this.getHarvestPerSec = function(){
    return harvestPerSec;
  };

  this.getHarvestPerClick = function(){
    return harvestPerClick;
  };

  this.increaseHarvestPerSec = function(amount){
    harvestPerSec += amount;
  };

  this.increaseHarvestPerClick = function(amount){
    harvestPerClick += amount;
  };

  this.unavailable = function(object){
    if (cropsHarvested < object.price)
      return "unavailable";
  };

});
