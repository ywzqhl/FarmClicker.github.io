// Define a service named 'storage' to manage storage logic
FarmClickerApp.service('storage', function(){
  var maxStorage = 200; // Maximum storage capacity
  var currentStorage = maxStorage; // Current storage usage initialized to maxStorage
  var lastOnlineTime = new Date(); // Track the last time the player was online
  var freeRefills = 6; // Daily free refills
  var lastRefillTime = new Date(0); // Last refill time, initialized to epoch

  // Get the maximum storage capacity
  this.getMaxStorage = function(){
    return maxStorage;
  };

  // Increase the maximum storage capacity
  this.increaseMaxStorage = function(amount){
    maxStorage += amount;
  };

  // Get the current storage usage
  this.getCurrentStorage = function(){
    return currentStorage;
  };

  // Increase the current storage usage
  this.increaseCurrentStorage = function(amount){
    currentStorage += amount;
    if (currentStorage > maxStorage) currentStorage = maxStorage; // Ensure storage doesn't exceed maxStorage
  };

  // Decrease the current storage usage
  this.decreaseCurrentStorage = function(amount){
    currentStorage -= amount;
    if (currentStorage < 0) currentStorage = 0; // Ensure storage doesn't go negative
  };

  // Auto refill current storage
  this.autoRefillStorage = function(amount){
    var currentTime = new Date();
    var timeDifference = (currentTime - lastOnlineTime) / (1000 * 60 * 60); // Time difference in hours
    if (timeDifference < 3) {
      this.increaseCurrentStorage(amount);
    }
  };

  // Update last online time to the current time
  this.updateLastOnlineTime = function(){
    lastOnlineTime = new Date();
  };

  // Use a free refill to set currentStorage to maxStorage
  this.useFreeRefill = function(){
    var currentTime = new Date();
    var timeSinceLastRefill = (currentTime - lastRefillTime) / (1000 * 60 ); // Time since last refill in hours
    if (freeRefills > 0 && timeSinceLastRefill >= 1) {
      currentStorage = maxStorage;
      freeRefills -= 1;
      lastRefillTime = currentTime;
    }
  };

  // Get the number of free refills left
  this.getFreeRefills = function(){
    return freeRefills;
  };

  // Reset free refills to 6 every day
  this.resetDailyRefills = function(){
    var currentTime = new Date();
    var hoursSinceLastReset = (currentTime - lastRefillTime) / (1000 * 60 * 60);
    if (hoursSinceLastReset >= 24) {
      freeRefills = 6;
      lastRefillTime = currentTime; // Update last refill time to current time after reset
    }
  };

});
