FarmClickerApp.service('storage', function(){
  var maxStorage = 500;

  this.getMaxStorage = function(){
    return maxStorage;
  };

  this.increaseMaxStorage = function(amount){
    maxStorage += amount;
  };

});
