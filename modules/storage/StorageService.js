FarmClickerApp.service('storage', function(){
  var maxStorage = 20000000000;

  this.getMaxStorage = function(){
    return maxStorage;
  };

  this.increaseMaxStorage = function(amount){
    maxStorage += amount;
  };

});
