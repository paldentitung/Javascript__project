const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect in every aspect of life.",
  "Typing is a valuable skill in the digital world.",
  "Consistency and patience lead to improvement.",
];
const sentenceEl = document.querySelector(".sentence");
const userInput = document.getElementById("userInput");
const timeEl = document.getElementById("time");
const WPM = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const startBtn = document.getElementById("start-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalCloseBtn = document.querySelector(".modal__close__btn");

let time = 60;
let interval;
let typedCharacters = 0;
let wordsTyped = 0;
let startTime;
console.log(sentenceEl);
console.log(userInput);
console.log(time);
console.log(WPM);
console.log(accuracy);
console.log(startBtn);
console.log(sentences);

function randomSentence() {
  let random = Math.floor(Math.random() * sentences.length);
  let randomSentence = sentences[random];
  console.log(random);
  console.log(randomSentence);
  return randomSentence;
}

function startGame() {
  sentenceEl.textContent = randomSentence();
  userInput.disabled = false;
  userInput.value = "";
  time = 60;
  timeEl.textContent = `${time}s`;

  WPM.innerText = "0";
  accuracy.innerText = "100%";
  interval = setInterval(() => {
    time--;
    timeEl.textContent = `${time}s`;
    if (time === 0) {
      clearInterval(interval);
      modal.classList.add("active");
      modalContent.innerHTML = `time up!`;
      userInput.disabled = true;
    }
  }, 1000);
}

userInput.addEventListener("input", () => {
  const userText = userInput.value;
  typedCharacters = userText.length;
  wordsTyped = typedCharacters / 5;

  const currentTime = new Date().getTime();
  const elapsedSeconds = (currentTime - startTime) / 1000;
  const elapsedMin = elapsedSeconds / 60;

  const wpm = Math.round(wordsTyped / elapsedMin);
  WPM.innerText = isFinite(wpm) ? wpm : 0;

  const original = sentenceEl.textContent;
  let correctChars = 0;
  for (let i = 0; i < userText.length; i++) {
    if (userText[i] === original[i]) {
      correctChars++;
    }
  }
  const accuracyPercent =
    typedCharacters === 0
      ? 100
      : Math.round((correctChars / typedCharacters) * 100);
  accuracy.textContent = `${accuracyPercent}%`;
});
console.log(wordsTyped);

startBtn.addEventListener("click", () => {
  if (interval) {
    clearInterval(interval);
  }
  startTime = new Date().getTime();

  startGame();
});
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
