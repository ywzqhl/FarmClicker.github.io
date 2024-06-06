angular.module('CropsController', [])
.controller('CropsController', function($scope, CropsData) {
    $scope.clickCount = 0; // Initialize click count
    $scope.energy = 100; // Initial energy
    $scope.maxEnergy = 100; // Maximum energy
    $scope.balance = 160117; // Initial balance
    $scope.miningSpeed = 10; // Mining speed
    $scope.lastOnlineTime = Date.now(); // Last online time
    $scope.freeRefills = 6; // Daily free refills
    $scope.multitap = 1; // Initial multitap
    $scope.multitapPrice = 100; // Multitap price
    $scope.energyLimitPrice = 200; // Energy limit price
    $scope.dailyRewards = [500, 1000, 2500, 5000, 15000, 25000, 100000, 500000, 1000000, 5000000];
    $scope.currentDay = 0; // Current reward day
    $scope.profitPerHour = 2.45; // Profit per hour
    $scope.level = 4; // Current level
    $scope.maxLevel = 10; // Maximum level

    // Function to handle touch events for multi-touch counting
    $scope.handleTouchEvent = function(event) {
        event.preventDefault(); // Prevent default behavior
        const touchPoints = event.touches.length * $scope.multitap; // Calculate touch points
        if ($scope.energy > 0) {
            $scope.clickCount += touchPoints; // Increase click count
            $scope.balance += touchPoints; // Increase balance
            $scope.energy -= touchPoints; // Decrease energy
        }
        $scope.$apply(); // Trigger Angular digest cycle to update the view
    };

    // Function to handle mouse click events
    $scope.increment = function() {
        if ($scope.energy > 0) {
            $scope.clickCount++;
            $scope.balance++;
            $scope.energy--;
        }
    };

    // Auto refill energy
    $scope.autoRefillEnergy = function() {
        let currentTime = Date.now();
        let timeDifference = (currentTime - $scope.lastOnlineTime) / (1000 * 60 * 60); // Convert to hours
        if (timeDifference < 3) {
            $scope.energy += $scope.miningSpeed * timeDifference;
            if ($scope.energy > $scope.maxEnergy) {
                $scope.energy = $scope.maxEnergy;
            }
        }
        $scope.lastOnlineTime = currentTime;
    };

    // Daily free refill
    $scope.dailyFreeRefill = function() {
        $scope.freeRefills = 6;
    };

    $scope.useFreeRefill = function() {
        if ($scope.freeRefills > 0) {
            $scope.energy = $scope.maxEnergy;
            $scope.freeRefills--;
        }
    };

    // Buy multitap
    $scope.buyMultitap = function() {
        if ($scope.balance >= $scope.multitapPrice) {
            $scope.balance -= $scope.multitapPrice;
            $scope.multitap++;
            $scope.multitapPrice *= $scope.multitap;
        } else {
            alert('Insufficient balance');
        }
    };

    // Buy energy limit
    $scope.buyEnergyLimit = function() {
        if ($scope.balance >= $scope.energyLimitPrice) {
            $scope.balance -= $scope.energyLimitPrice;
            $scope.maxEnergy += 100;
            $scope.energyLimitPrice *= 2;
        } else {
            alert('Insufficient balance');
        }
    };

    // Daily reward
    $scope.dailyReward = function() {
        if ($scope.currentDay < $scope.dailyRewards.length) {
            $scope.balance += $scope.dailyRewards[$scope.currentDay];
            $scope.currentDay++;
        } else {
            $scope.currentDay = 0;
            $scope.balance += $scope.dailyRewards[$scope.currentDay];
        }
    };

    // Show popup
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

    // Hide popup
    $scope.hidePopup = function() {
        $('#popup').modal('hide');
    };

    // Automatically refill energy every minute
    setInterval($scope.autoRefillEnergy, 60000);

    // Fetch crops data
    $scope.crops = CropsData;

    // Add touch event listener
    document.addEventListener('touchstart', $scope.handleTouchEvent, false);
});
