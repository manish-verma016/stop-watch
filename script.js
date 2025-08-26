const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

let timer = null; // Stores the interval ID to stop the timer
let startTime = 0; // Stores the time when the stopwatch started or resumed
let elapsedTime = 0; // Stores the total elapsed time when paused

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Pad with leading zeros if single digit
    const pad = (num) => String(num).padStart(2, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function updateStopwatch() {
    // Calculate current elapsed time based on how much time passed since startTime
    // and add it to any previously elapsed time.
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener('click', () => {
    if (timer) return; // Prevent multiple intervals if already running

    // Set startTime to the current time, adjusted by any previously elapsed time
    // This allows the stopwatch to resume from where it left off.
    startTime = Date.now() - elapsedTime;

    // Start the timer: update the display every 1000ms (1 second)
    timer = setInterval(updateStopwatch, 1000);
});

stopBtn.addEventListener('click', () => {
    clearInterval(timer); // Stop the interval
    timer = null; // Clear the timer ID
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer); // Stop the timer if it's running
    timer = null;
    elapsedTime = 0; // Reset elapsed time
    display.textContent = '00:00:00'; // Reset display
});

// Initialize display on load
display.textContent = formatTime(0);