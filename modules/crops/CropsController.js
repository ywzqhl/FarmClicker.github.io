angular.module('CropsController', [])
.controller('CropsController', function($scope, CropsData) {
    $scope.clickCount = 0; // 初始化点击计数
    $scope.energy = 100; // 初始能量
    $scope.maxEnergy = 100; // 最大能量
    $scope.balance = 0; // 初始余额
    $scope.miningSpeed = 10; // 挖矿速度
    $scope.lastOnlineTime = Date.now(); // 最后上线时间
    $scope.freeRefills = 6; // 每日免费补充次数
    $scope.multitap = 1; // 初始多点触控
    $scope.multitapPrice = 100; // 多点触控价格
    $scope.energyLimitPrice = 200; // 能量上限价格
    $scope.dailyRewards = [500, 1000, 2500, 5000, 15000, 25000, 100000, 500000, 1000000, 5000000];
    $scope.currentDay = 0; // 当前奖励天数

    // 处理触摸事件的函数，用于多点触控计数
    $scope.handleTouchEvent = function(event) {
        event.preventDefault(); // 阻止默认行为
        const touchPoints = event.touches.length * $scope.multitap; // 计算触控点数量
        if ($scope.energy > 0) {
            $scope.clickCount += touchPoints; // 增加点击计数
            $scope.balance += touchPoints; // 增加余额
            $scope.energy -= touchPoints; // 减少能量
        }
        $scope.$apply(); // 触发 Angular 的 digest 循环以更新视图
    };

    // 处理鼠标点击事件
    $scope.increment = function() {
        if ($scope.energy > 0) {
            $scope.clickCount++;
            $scope.balance++;
            $scope.energy--;
        }
    };

    // 自动补充能量
    $scope.autoRefillEnergy = function() {
        let currentTime = Date.now();
        let timeDifference = (currentTime - $scope.lastOnlineTime) / (1000 * 60 * 60); // 转换为小时
        if (timeDifference < 3) {
            $scope.energy += $scope.miningSpeed * timeDifference;
            if ($scope.energy > $scope.maxEnergy) {
                $scope.energy = $scope.maxEnergy;
            }
        }
        $scope.lastOnlineTime = currentTime;
    };

    // 每日免费补充
    $scope.dailyFreeRefill = function() {
        $scope.freeRefills = 6;
    };

    $scope.useFreeRefill = function() {
        if ($scope.freeRefills > 0) {
            $scope.energy = $scope.maxEnergy;
            $scope.freeRefills--;
        }
    };

    // 每日多点触控购买
    $scope.buyMultitap = function() {
        if ($scope.balance >= $scope.multitapPrice) {
            $scope.balance -= $scope.multitapPrice;
            $scope.multitap++;
            $scope.multitapPrice *= $scope.multitap;
        } else {
            alert('Insufficient balance');
        }
    };

    // 能量上限购买
    $scope.buyEnergyLimit = function() {
        if ($scope.balance >= $scope.energyLimitPrice) {
            $scope.balance -= $scope.energyLimitPrice;
            $scope.maxEnergy += 100;
            $scope.energyLimitPrice *= 2;
        } else {
            alert('Insufficient balance');
        }
    };

    // 每日奖励
    $scope.dailyReward = function() {
        if ($scope.currentDay < $scope.dailyRewards.length) {
            $scope.balance += $scope.dailyRewards[$scope.currentDay];
            $scope.currentDay++;
        } else {
            $scope.currentDay = 0;
            $scope.balance += $scope.dailyRewards[$scope.currentDay];
        }
    };

    // 显示弹出窗口
    $scope.showPopup = function(type) {
        switch(type) {
            case 'freeRefill':
                $scope.popupTitle = "Use Free Refill";
                $scope.popupContent = "Use one of your daily free refills to restore your energy to the maximum level.";
                $scope.confirmPopup = $scope.useFreeRefill;
                break;
            case 'multitap':
                $scope.popupTitle = "Buy Multitap";
                $scope.popupContent = "Increase the number of taps you can register simultaneously. Cost: " + $scope.multitapPrice;
                $scope.confirmPopup = $scope.buyMultitap;
                break;
            case 'energyLimit':
                $scope.popupTitle = "Buy Energy Limit";
                $scope.popupContent = "Increase your maximum energy limit. Cost: " + $scope.energyLimitPrice;
                $scope.confirmPopup = $scope.buyEnergyLimit;
                break;
            case 'dailyReward':
                $scope.popupTitle = "Claim Daily Reward";
                $scope.popupContent = "Claim your daily reward for day " + ($scope.currentDay + 1) + ": " + $scope.dailyRewards[$scope.currentDay];
                $scope.confirmPopup = $scope.dailyReward;
                break;
        }
        $('#popup').modal('show');
    };

    // 隐藏弹出窗口
    $scope.hidePopup = function() {
        $('#popup').modal('hide');
    };

    // 定时自动补充能量，每分钟检查一次
    setInterval($scope.autoRefillEnergy, 60000);

    // 获取作物数据
    $scope.crops = CropsData;

    // 添加触摸事件监听器
    document.addEventListener('touchstart', $scope.handleTouchEvent, false);
});
