const time = document.querySelector(".time");
const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".reset-btn");
// console.log(time);
// console.log(startBtn);
// console.log(pauseBtn);
// console.log(resetBtn);

let day = 0,
  hours = 0,
  min = 0,
  sec = 0;

let interval;

let isRunning = false;
function setTimer() {
  if (isRunning) return;
  isRunning = true;
  interval = setInterval(() => {
    sec++;

    if (sec === 60) {
      sec = 0;
      min++;
    }
    if (min === 60) {
      min = 0;
      hours++;
    }
    if (hours === 24) {
      hours = 0;
      day++;
    }
    time.innerHTML = `${day}:${pad(hours)}:${pad(min)}:${pad(sec)}`;
  }, 1000);
}

function pad(num) {
  return num.toString().padStart(2, "0");
}
startBtn.addEventListener("click", () => {
  setTimer();
});
resetBtn.addEventListener("click", () => {
  clearInterval(interval);
  sec = 0;
  min = 0;
  hours = 0;
  day = 0;
  time.innerHTML = `${day}:${pad(hours)}:${pad(min)}:${pad(sec)}`;
});

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    pauseBtn.innerHTML = "Resume";
  } else {
    setTimer();
    pauseBtn.innerHTML = "Pause";
  }
});
