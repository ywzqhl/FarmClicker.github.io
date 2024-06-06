// 定义一个名为 'ProductivityController' 的控制器，并注入 '$scope'、'$http'、'productivity' 和 'harvest' 作为依赖
FarmClickerApp.controller('ProductivityController', ['$scope', '$http', 'productivity', 'harvest', function($scope, $http, productivity, harvest){

  // 初始化作用域中的 productivityUpgrades 对象
  $scope.productivityUpgrades = {};

  // 使用 $http 服务从 '/modules/productivity/ProductivityUpgrades.js' 获取生产力升级数据
  $http.get('/modules/productivity/ProductivityUpgrades.js').success(function(data) {
    // 成功获取数据后，将其赋值给 $scope.productivityUpgrades
    $scope.productivityUpgrades = data;
  });

  // 定义一个函数，当用户点击某个升级时调用
  $scope.clickUpgrade = function(upgrade){
    // 检查收割的作物数量是否大于或等于升级的价格
    if (harvest.getCropsHarvested() >= upgrade.price) {
      // 如果条件满足，从收割的作物数量中扣除升级的价格
      harvest.deductFromHarvest(upgrade.price);
      // 增加每秒收割的作物数量
      harvest.increaseHarvestPerSec(upgrade.persecond);

      // 增加已购买的升级数量
      upgrade.bought += 1;
      // 增加升级的价格，按一定比例增加
      upgrade.price += Math.floor(upgrade.price * upgrade.increase);
    }
  };

  // // 返回显示不可用升级的类（已注释掉）
  // $scope.unavailable = function(upgrade){
  //   return harvest.unavailable(upgrade);
  // };

}]);
