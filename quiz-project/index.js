import { data } from "./data.js";

let questionHtml = "";
let correctAnswer = [];
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const form = document.querySelector("form");
const resetBtn = document.getElementById("reset-btn");
data.forEach((question, index) => {
  questionHtml += `       
   <div class="quiz-row">
     <label for="">${question.question}?</label>
     <div class="input-row">
       ${question.options
         .map(
           (option) => `
           <div class="radio-input">
             <input type="radio" value="${option}" name="question-${index}" />
             ${option}
           </div>
         `
         )
         .join("")}
     </div>
   </div>`;
  correctAnswer.push(question.correct);
});

document.querySelector(".quiz-container").innerHTML = questionHtml;

console.log(correctAnswer);
const submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", () => {
  modal.classList.add("active");
  modalContent.innerHTML = "";
  let span1 = document.createElement("span");
  span1.innerHTML = "Do you want to Submit ";
  let submitButton = document.createElement("button");
  submitButton.innerHTML = "Confirm Submit";

  modalContent.appendChild(span1);
  modalContent.appendChild(submitButton);

  submitButton.addEventListener("click", () => {
    modalContent.innerHTML = "";
    submitFunction();
  });
});
function submitFunction() {
  let userAnswers = [];

  data.forEach((_, index) => {
    const userSelected = document.querySelector(
      `input[name="question-${index}"]:checked`
    );
    if (userSelected) {
      userAnswers.push(userSelected.value);
    } else {
      userAnswers.push(null);
    }
  });

  let score = 0;
  userAnswers.forEach((ans, index) => {
    if (ans === correctAnswer[index]) {
      score++;
    }
  });
  modal.classList.add("active");

  let span = document.createElement("span");
  span.innerHTML = ` you score is ${score} out of ${data.length}`;

  modalContent.appendChild(span);
}
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  modalContent.innerHTML = "";
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    modalContent.innerHTML = "";
  }
});
resetBtn.addEventListener("click", () => {
  form.reset();
});
