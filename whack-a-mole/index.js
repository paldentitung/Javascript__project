const moles = document.querySelectorAll(".mole");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const startBtn = document.getElementById("start-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalCloseBtn = document.querySelector(".modal__close__btn");

console.log(moles);
console.log(scoreEl);
console.log(timeEl);
console.log(startBtn);
let time = 30;
let score = 0;
let interval;

function randomMole() {
  const randomMole = Math.floor(Math.random() * moles.length);
  console.log(randomMole);
  return moles[randomMole];
}
moles.forEach((mole) => {
  mole.addEventListener("click", () => {
    if (mole.classList.contains("active")) {
      score++;

      scoreEl.textContent = score;
      mole.classList.remove("active");
      showMole();
    }
  });
});
function showMole() {
  moles.forEach((mole) => mole.classList.remove("active"));
  const moleToShow = randomMole();
  console.log("mole to ", moleToShow);
  moleToShow.classList.add("active");
}
startBtn.addEventListener("click", () => {
  startBtn.disabled = true;

  time = 30;
  score = 0;
  timeEl.textContent = time;
  scoreEl.textContent = score;

  showMole();
  setTime();
});

function setTime() {
  if (interval) clearInterval(interval);
  interval = setInterval(() => {
    time--;
    timeEl.textContent = time;
    if (time === 0) {
      clearInterval(interval);
      moles.forEach((mole) => mole.classList.remove("active"));
      modalContent.innerHTML = "";
      modal.classList.add("active");
      let span = document.createElement("span");
      span.innerHTML = `you score is ${score}`;
      modalContent.appendChild(span);
      startBtn.disabled = false;
    }
  }, 1000);
}
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
