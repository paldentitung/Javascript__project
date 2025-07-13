const openModalBtn = document.querySelector(".open__modal__button");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector(".modal__close__btn");
const submitBtn = document.querySelector(".submit__btn");
const modalContent = document.querySelector(".modal__content__container");
const modalForm = document.querySelector(".modal form");
const formSuccessfullMessage = document.querySelector(".modal__message");
let count = 0;
openModalBtn.addEventListener("click", () => {
  modal.classList.add("active");
});
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
  modalForm.classList.remove("active");
  formSuccessfullMessage.classList.remove("active");
  modalContent.classList.remove("active");
});
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const gender = document.querySelector('form input[name="gender"]:checked');
  console.log(gender);
  const fullname = document.getElementById("name");
  console.log(fullname);
  const email = document.getElementById("email");
  if (fullname.value === "") {
    alert("enter the name");
    return;
  }
  if (email.value === "") {
    alert("enter the email");
    return;
  }
  if (!gender) {
    alert("enter the gender");
    return;
  }
  count++;
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  let span3 = document.createElement("span");
  let countLabel = document.createElement("label");
  countLabel.innerHTML = `#${count}`;
  let div = document.createElement("div");
  span1.innerHTML = fullname.value;
  span2.innerHTML = email.value;
  span3.innerHTML = gender.value;
  div.appendChild(countLabel);
  div.appendChild(span1);
  div.appendChild(span2);
  div.appendChild(span3);

  div.classList.add("form__input");
  modalContent.appendChild(div);

  modalContent.classList.add("active");
  modalForm.classList.add("active");
  formSuccessfullMessage.classList.add("active");
  modalForm.reset();
  console.log("clicked");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
    modalForm.classList.remove("active");
    formSuccessfullMessage.classList.remove("active");
    modalContent.classList.remove("active");
  }
});
