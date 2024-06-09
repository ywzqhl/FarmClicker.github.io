FarmClickerApp.controller('HarvestController', ['$scope', '$interval', 'harvest', 'storage', function($scope, $interval, harvest, storage){

  // 获取当前等级名称
  $scope.getCurrentLevel = function() {
    return harvest.getCurrentLevel().name;
  };

  // 获取当前等级编号
  $scope.getCurrentLevelNumber = function() {
    return harvest.getCurrentLevel().level;
  };

  // 获取等级进度
  $scope.getLevelProgress = function() {
    return harvest.getLevelProgress();
  };

  // 获取收割按钮图像路径
  $scope.getHarvestCropButton = function(){
    return harvest.getHarvestCropButton();
  };

  // 获取已收割的庄稼数量
  $scope.getCropsHarvested = function(){
    return harvest.getCropsHarvested();
  };

  // 获取每秒收割的庄稼数量
  $scope.getHarvestPerSec = function(){
    return harvest.getHarvestPerSec();
  };

  // 根据触摸点数量收割庄稼并创建动画
  $scope.harvestCrops = function(event){
    var touchPoints = event.touches ? event.touches.length : 1; // 获取触摸点数量，默认为1
    var harvestAmount = harvest.getHarvestPerClick() * touchPoints; // 根据触摸点计算收割量
    if (storage.getCurrentStorage() >= harvestAmount && storage.getCurrentStorage() > 0) { // 检查当前储量是否足够且不为零
      storage.decreaseCurrentStorage(harvestAmount); // 减少当前储量
      harvest.addToHarvest(harvestAmount); // 添加已收割的庄稼
      createHarvestAnimations(event, touchPoints); // 创建动画
    }
  };

  // 创建收割动画
  function createHarvestAnimations(event, touchPoints) {
    var container = document.getElementById('animationContainer');
    for (var i = 0; i < touchPoints; i++) {
      var valueDisplay = document.createElement('div');
      valueDisplay.innerText = '+' + harvest.getHarvestPerClick(); // 显示收割量
      valueDisplay.className = 'riseAndFade';
      valueDisplay.style.left = (event.touches ? event.touches[i].clientX : event.clientX) + 'px';
      valueDisplay.style.top = (event.touches ? event.touches[i].clientY : event.clientY) + 'px';
      container.appendChild(valueDisplay);

      // 动画结束后移除valueDisplay元素
      valueDisplay.addEventListener('animationend', function() {
        valueDisplay.remove();
      });
    }
  }

  // 每秒自动补充当前储量
  $interval(function() {
    storage.autoRefillStorage(harvest.getHarvestPerSec());
  }, 1000);

  // 更新最后上线时间
  storage.updateLastOnlineTime();

  // 添加触摸事件监听器
  document.getElementById('harvestButton').addEventListener('touchstart', function(event) {
    $scope.$apply(function() {
      $scope.harvestCrops(event);
    });
  });

  // 添加鼠标事件监听器
  document.getElementById('harvestButton').addEventListener('mousedown', function(event) {
    $scope.$apply(function() {
      $scope.harvestCrops(event);
    });
  });

}]);
