const balance = document.getElementById("balance");
const addBtn = document.getElementById("add");
const transactionDetails = document.querySelector(".transaction__details");
const Description = document.getElementById("description");
const amount = document.getElementById("amount");
const type = document.querySelector("form select");
const form = document.querySelector(".container form");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalCloseBtn = document.querySelector(".modal__close__btn");

let totalBalance = 0;

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (!validateTransaction()) {
    modal.classList.add("active");
    modalContent.innerHTML = "Enter a valid transaction to be processed";
    return;
  }
  savedExpense();
});

function validateTransaction() {
  if (Description.value === "") {
    modal.classList.add("active");
    modalContent.innerHTML = "Enter the description";
    return;
  }
  if (amount.value === "") {
    modal.classList.add("active");
    modalContent.innerHTML = "Enter the amount";
    return;
  }
  if (type.value === "") {
    modal.classList.add("active");
    modalContent.innerHTML = "Select the type of transaction";
    return;
  }

  modal.classList.add("active");
  modalContent.innerHTML = "Added";
  return true;
}

function renderExpense() {
  transactionDetails.innerHTML = "";
  const savedExpenseLocally = getExpense();

  if (savedExpenseLocally.length === 0) {
    transactionDetails.innerHTML = `<li>No Transaction is added</li>`;
    balance.innerHTML = 0;
    totalBalance = 0;
    return;
  }

  savedExpenseLocally.forEach((elements, index) => {
    let li = document.createElement("li");
    let span1 = document.createElement("span");
    let span2 = document.createElement("span");
    let span3 = document.createElement("span");
    let button = document.createElement("button");

    span1.innerHTML = elements.DescriptionType;
    span2.innerHTML = elements.Amount;
    span3.innerHTML = elements.ExpenseType;

    button.innerHTML = "delete";
    button.classList.add("delete");
    button.addEventListener("click", () => {
      savedExpenseLocally.splice(index, 1);
      localStorage.setItem("savedExpense", JSON.stringify(savedExpenseLocally));
      renderExpense();
      modal.classList.add("active");
      modalContent.innerHTML = "Deleted";
    });

    li.appendChild(span1);
    li.appendChild(span2);
    li.appendChild(span3);
    li.appendChild(button);
    transactionDetails.appendChild(li);
  });

  form.reset();
  recalcTotalBalance();
}

function getExpense() {
  try {
    const saved = localStorage.getItem("savedExpense");
    if (saved) {
      return JSON.parse(saved);
    } else {
      return [];
    }
  } catch (error) {
    alert("Error: " + error);
    return [];
  }
}

function savedExpense() {
  const saved = getExpense();
  const allTransaction = {
    DescriptionType: Description.value,
    Amount: parseFloat(amount.value),
    ExpenseType: type.value,
  };

  saved.push(allTransaction);
  localStorage.setItem("savedExpense", JSON.stringify(saved));
  renderExpense();
}

function recalcTotalBalance() {
  const savedExpenseLocally = getExpense();
  totalBalance = 0;
  savedExpenseLocally.forEach((elements) => {
    if (elements.ExpenseType === "income") {
      totalBalance += elements.Amount;
    } else {
      totalBalance -= elements.Amount;
    }
  });
  balance.innerHTML = totalBalance;
}

modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  renderExpense();
});
