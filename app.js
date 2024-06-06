var FarmClickerApp = angular.module('FarmClickerApp', ['ngRoute']);
//TODO: routing
FarmClickerApp.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'ApplicationController',
    templateUrl: 'modules/application/app.html'
  })
  .when('/about', {
    templateUrl: 'modules/about/about.html'
  })
  .otherwise({
    redirectTo: '/'
  });
});

document.addEventListener("DOMContentLoaded", function() {
    let currentBalance = 0;
    let harvestPerClick = 1;
    let siloStorage = 200;
    let maxStorage = 200;

    const levels = [
        {name: "Bronze", balance: 0},
        {name: "Silver", balance: 5000},
        {name: "Gold", balance: 25000},
        {name: "Platinum", balance: 100000},
        {name: "Diamond", balance: 1000000},
        {name: "Epic", balance: 2000000},
        {name: "Legendary", balance: 10000000},
        {name: "Master", balance: 50000000},
        {name: "Grandmaster", balance: 100000000}
    ];

    function updateLevel() {
        for (let i = levels.length - 1; i >= 0; i--) {
            if (currentBalance >= levels[i].balance) {
                harvestPerClick = i + 1;
                maxStorage = levels[i].balance;
                document.getElementById("level").innerText = levels[i].name;
                break;
            }
        }
    }

    function clickHandler() {
        if (siloStorage < maxStorage) {
            currentBalance += harvestPerClick;
            siloStorage += harvestPerClick;
            updateLevel();
            document.getElementById("balance").innerText = currentBalance;
            document.getElementById("siloStorage").innerText = siloStorage;
            savePlayerData(); // Save the data to MongoDB
        } else {
            alert('Silo is full!');
        }
    }

    function savePlayerData() {
        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                currentBalance: currentBalance,
                harvestPerClick: harvestPerClick,
                siloStorage: siloStorage,
                maxStorage: maxStorage
            })
        });
    }

    document.getElementById("clickButton").addEventListener("click", clickHandler);

    // Initialize game elements
    document.getElementById("balance").innerText = currentBalance;
    document.getElementById("siloStorage").innerText = siloStorage;
    document.getElementById("level").innerText = "Bronze";
});

let clickCount = 0;

const clickArea = document.getElementById('clickArea');

// Function to handle touch events
function handleTouchEvent(event) {
    // Prevent default behavior
    event.preventDefault();

    // Count the number of touch points
    const touchPoints = event.touches.length;

    // Increase the click count by the number of touch points
    clickCount += touchPoints;

    // Update the display (assuming you have an element to show the count)
    document.getElementById('clickCountDisplay').innerText = `Clicks: ${clickCount}`;
}

// Function to handle mouse click events
function handleMouseEvent(event) {
    clickCount++;
    document.getElementById('clickCountDisplay').innerText = `Clicks: ${clickCount}`;
}

// Add event listeners for touch and mouse events
clickArea.addEventListener('touchstart', handleTouchEvent, false);
clickArea.addEventListener('mousedown', handleMouseEvent, false);

