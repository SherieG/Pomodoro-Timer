document,addEventListener('DOMContentLoaded', function() {
    
})


const { update } = require("sequelize/lib/model");

//Set the default values for a Pomodoro session
const pomodoroDruation = 25 * 60; //25 minutes in seconds
const breakDuration = 5 * 60; //5 minutes in seconds

let timer = null;
let currentDuration = pomodoroDuration;

//Function to start timer
function startTimer(){
    //Check if timer is already running
    if(timer !== null) {
        return; //If the timer is already runnin, exit the function
    }
    
    // Set an interval to increment the timer every second
    timer = setInterval(() => {
        time++;
        updateDisplay(); //Call a function to update the timer display
    }, 1000);
}

//Function to stop the timer
function stopTimer() {
    //Clear the interval and reset the timer and time variables
    clearInterval(timer);
    timer = null;
    timer = 0;
    updateDisplay(); //Call a function to update the timer display
}

//Function to reset the timer back to 0
function resetTimer() {
    //Reset the timer and time variables
    clearInterval(timer);
    timer = null;
    time = 0;
    updateDisplay(); //Call a function to update the timer display
}

function updateTimer() {
    currentDuration--;
    updateDisplay();

    if(currentDuration <= 0) {
        //Timer finished, switch to break of pomodoro session
        stopTimer();

        if(currentDuration === 0) {
            if(currentDuration === pomodoroDruation) {
                currentDuration = breakDuration;
            } else {
                currentDuration = pomodoroDruation;
            }

            startTimer();
        }
    }
}

//Function to update the timer display
function updateDisplay() {
    //Get the DOM element for displaying the timer
    const timerDisplay = document.getElementById('timer-display');

    //Calculate the minutes and seconds from the time variable
    const minutes = Math.floor(time/60);
    const seconds = time % 60;

    //Format the minutes and seconds with leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(seconds).padStart(2,'0');

    //Update the timer display
    timerDisplay.textContent = '${formattedMinutes}:${formattedSeconds}';
}

//Get the DOM elements for the bottons
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.gerElementById('reset-button');

//Add event listeners to the buttons to call the corresponding functions
startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);

//Example usage:
startTimer();