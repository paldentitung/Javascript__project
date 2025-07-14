const nextBtn = document.querySelectorAll(".next__btn");
const prevBtn = document.querySelectorAll(".pre__btn");
const summaryContent = document.getElementById("summary__content");
const sumbitBtn = document.querySelector(".submit__btn");
const resetBtn = document.querySelector(".reset__btn");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalCloseBtn = document.querySelector(".modal__close__btn");
const progressBar = document.getElementById("progressBar");

const step = document.querySelectorAll(".step");
const userName = document.getElementById("name");
const userEmail = document.getElementById("email");
const userGender = document.getElementById("gender");
const userCity = document.getElementById("city");
const userCountry = document.getElementById("country");
const userAge = document.getElementById("age");

let currentStep = 0;
nextBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (userName.value === "") {
      modal.classList.add("active");
      modalContent.innerHTML = "enter the name";
      return;
    }
    if (userEmail.value === "") {
      modal.classList.add("active");
      modalContent.innerHTML = "enter the email";
      return;
    }
    if (currentStep === 1) {
      if (userCity.value === "") {
        modal.classList.add("active");
        modalContent.innerHTML = "enter the city";
        return;
      }
      if (userCountry.value === "") {
        modal.classList.add("active");
        modalContent.innerHTML = "enter the Country";
        return;
      }
    }

    if (currentStep === 2) {
      if (userAge.value === "") {
        modal.classList.add("active");
        modalContent.innerHTML = "enter the age";
        return;
      }
      if (userGender.value === "") {
        modal.classList.add("active");
        modalContent.innerHTML = "select the gender";
        return;
      }
    }
    step[currentStep].classList.remove("active");
    currentStep++;
    step[currentStep].classList.add("active");

    updateProgressBar();
  });
});
prevBtn.forEach((preBtn) => {
  preBtn.addEventListener("click", () => {
    step[currentStep].classList.remove("active");
    currentStep--;
    step[currentStep].classList.add("active");

    updateProgressBar();
  });
});
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
sumbitBtn.addEventListener("click", () => {
  modal.classList.add("active");
  modalContent.innerHTML = `form submit successfully`;
  summaryContent.innerHTML = "";
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  let span3 = document.createElement("span");
  let span4 = document.createElement("span");
  let span5 = document.createElement("span");
  let span6 = document.createElement("span");
  span1.innerHTML = `Name :${userName.value}`;
  span2.innerHTML = `Email:${userEmail.value}`;
  span3.innerHTML = `City${userCity.value}`;
  span4.innerHTML = `Country:${userCountry.value}`;
  span5.innerHTML = `Gender :${userGender.value}`;
  span6.innerHTML = `Age${userAge.value}`;
  let div = document.createElement("div");
  div.appendChild(span1);
  div.appendChild(span2);
  div.appendChild(span3);
  div.appendChild(span4);
  div.appendChild(span5);
  div.appendChild(span6);
  div.classList.add("summary__content__div");
  summaryContent.appendChild(div);
});
resetBtn.addEventListener("click", () => {
  console.log("clicked");
  step[currentStep].classList.remove("active");
  currentStep = 0;
  step[currentStep].classList.add("active");
  userName.value = "";
  userEmail.value = "";
  userCity.value = "";
  userCountry.value = "";
  userAge.value = "";
  userGender.value = "";
  updateProgressBar();
});
const totalSteps = step.length;

function updateProgressBar() {
  const percent = ((currentStep + 1) / totalSteps) * 100;
  progressBar.style.width = `${percent}%`;
}

updateProgressBar();
