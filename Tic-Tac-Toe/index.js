const btns = document.querySelectorAll(".btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".modal-close-btn");
console.table(btns);
console.log(modal);
console.log(modalCloseBtn);
console.log(modalContent);

let cross = "X";
let circle = "o";
let currentPlayer = cross;
let board = ["", "", "", "", "", "", "", "", ""];
let winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
console.table(winCombo);
btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (board[index] === "" && btn.textContent === "") {
      board[index] = currentPlayer;
      btn.textContent = currentPlayer;

      if (winnerChecking()) {
        modal.classList.add("active");
        modalContent.textContent = `${currentPlayer} wins!`;

        return;
      }

      if (!board.includes("")) {
        modalContent.textContent = "It's a draw!";
        modal.classList.add("active");
        return;
      }

      currentPlayer = currentPlayer === cross ? circle : cross;
    }

    console.log(board, "clicked", index);
  });
});

function winnerChecking() {
  let winner = false;
  winCombo.forEach((combos) => {
    if (combos.every((combo) => board[combo] === currentPlayer)) {
      winner = true;
    }
  });
  return winner;
}
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
  resetGame();
});
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  resetGame();
});
function resetGame() {
  board.fill("");
  btns.forEach((btn) => (btn.textContent = ""));
  currentPlayer = cross;
}
