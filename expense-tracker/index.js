const balance = document.getElementById("balance");
const addBtn = document.getElementById("add");
const transcationDetails = document.querySelector(".transaction__details");
const Description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.querySelector("form select");
const form = document.querySelector(" .container form");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalCloseBtn = document.querySelector(".modal__close__btn");

console.log(balance);
console.log(addBtn);
console.log(transcationDetails);
console.log(Description);
console.log(amount);
console.log(type);

let totalBalance = 0;
addBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (Description.value === "") {
    modal.classList.add("active");
    modalContent.innerHTML = "enter the description";
    return;
  }
  if (amount.value === "") {
    modal.classList.add("active");
    modalContent.innerHTML = "enter the  amount";
    return;
  }
  if (type.value === "") {
    modal.classList.add("active");
    modalContent.innerHTML = "select the type of transcations";
    return;
  }
  modal.classList.add("active");
  modalContent.innerHTML = "Added";

  const amt = parseFloat(amount.value);
  console.log(amt);

  if (type.value === "income") {
    totalBalance += amt;
  } else {
    totalBalance -= amt;
  }
  balance.innerHTML = totalBalance;

  let li = document.createElement("li");
  let span1 = document.createElement("span");
  let span2 = document.createElement("span");
  let span3 = document.createElement("span");
  let button = document.createElement("button");

  span1.innerHTML = `${Description.value}`;
  span2.innerHTML = `${amount.value}`;

  if (type.value === "income") {
    span3.innerHTML = `${type.value}`;
  } else {
    span3.innerHTML = `${type.value}`;
  }

  button.innerHTML = "delete";
  button.classList.add("delete");
  button.addEventListener("click", () => {
    const deletedAmount = parseFloat(span2.innerHTML);
    const deletdType = span3.innerHTML;
    if (deletdType === "income") {
      totalBalance += deletedAmount;
    } else {
      totalBalance -= deletedAmount;
    }
    balance.innerHTML = totalBalance;
    transcationDetails.removeChild(li);
    modal.classList.add("active");
    modalContent.innerHTML = "deleted";
  });
  li.appendChild(span1);
  li.appendChild(span2);
  li.appendChild(span3);
  li.appendChild(button);
  transcationDetails.appendChild(li);
  form.reset();
});
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
