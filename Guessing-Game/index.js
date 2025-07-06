const UserGuess = document.getElementById("user-guess");
const GuessBtn = document.getElementById("guess-btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".modal-close-btn");
let RandomNumber = Math.floor(Math.random() * 100);
let CountGuess = 0;

GuessBtn.addEventListener("click", () => {
  let UserGuessValue = Number(UserGuess.value);
  let rawInput = UserGuess.value;
  if (rawInput === "") {
    modalContent.innerHTML = "enter the number";
    modal.classList.add("active");
    return;
  }
  if (UserGuessValue >= 100 || UserGuessValue <= 0) {
    modalContent.innerHTML =
      "Invalid input, please enter a number between 1 and 99";
    modal.classList.add("active");
    return;
  }

  CountGuess++;
  document.querySelector(
    ".guess-history"
  ).innerHTML += `<span>${UserGuessValue}</span>`;

  if (UserGuessValue > RandomNumber) {
    modalContent.innerHTML = "the number is too high";
    modal.classList.add("active");
  } else if (UserGuessValue < RandomNumber) {
    modalContent.innerHTML = "the number is too low";
    modal.classList.add("active");
  } else {
    modalContent.innerHTML = "Congratulations! You win.";
    modalContent.innerHTML += ` <span>you have tried ${CountGuess} times</span>`;
    modalContent.innerHTML += `<button class="play-again-btn"> Play Again</button>`;
    modal.classList.add("active");
    let playAgainBtn = document.querySelector(".play-again-btn");
    playAgainBtn.addEventListener("click", () => {
      RandomNumber = Math.floor(Math.random() * 100);
      CountGuess = 0;
      document.querySelector(".guess-history").innerHTML = "";
      UserGuess.value = "";
      modal.classList.remove("active");
    });
  }
});
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
