FarmClickerApp.controller('CropsController', ['$scope', '$http', 'productivity', 'harvest', function($scope, $http, productivity, harvest){

  $scope.cropsData = {}; // 初始化作用域中的 cropsData 对象

  // 使用 $http 服务从 '/modules/crops/CropsData.js' 获取作物数据
  $http.get('/modules/crops/CropsData.js').success(function(data) {
    $scope.cropsData = data; // 成功获取数据后，将其赋值给 $scope.cropsData
  });

  // 定义一个函数，当用户点击某个作物时调用
  $scope.clickCrop = function(crop){
    if (harvest.getCropsHarvested() >= crop.price) { // 检查收割的作物数量是否大于或等于作物的价格
      harvest.deductFromHarvest(crop.price); // 从收割的作物数量中扣除作物的价格
      harvest.increaseHarvestPerClick(crop.perClick); // 增加每次点击的收割量
      crop.bought = true; // 将作物的 'bought' 属性设置为 true，表示已购买
    }
  };

}]);
