// Define a service named 'storage' to manage storage logic
FarmClickerApp.service('storage', function(){
  var maxStorage = 200; // Maximum storage capacity
  var currentStorage = maxStorage; // Current storage usage initialized to maxStorage
  var lastOnlineTime = new Date(); // Track the last time the player was online

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
});
