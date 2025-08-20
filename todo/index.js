const tasks = document.querySelector(".tasks");
const userInputEl = document.querySelector(".add-task-input");
const addTaskBtn = document.querySelector(".add-task-button");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".modal-close-btn");
const toastMessage = document.querySelector(".toast-message");

console.log(tasks);

console.log(addTaskBtn);
console.log(modal);
console.log(modalContent);
console.log(modalCloseBtn);
addTaskBtn.addEventListener("click", () => {
  savedTask();
});
function savedTask() {
  let userInput = userInputEl.value;
  let li = document.createElement("li");
  let span = document.createElement("span");
  let input = document.createElement("input");
  let button = document.createElement("button");
  input.type = "checkbox";
  button.innerHTML = "Delete";
  span.textContent = userInput;

  if (userInput === "") {
    modal.classList.add("active");
    modalContent.innerHTML = "Enter the task ";
    return;
  }

  showModal("are you want to add task", [
    {
      text: "Go Back",
      onClick: () => modal.classList.remove("active"),
    },
    {
      text: "Add",
      onClick: () => {
        showToast("task added");
        li.appendChild(input);
        li.appendChild(span);
        li.appendChild(button);
        tasks.appendChild(li);
        input.addEventListener("change", () => {
          console.log("changed");
          taskCompleted(li);
        });

        button.addEventListener("click", () => {
          deleteTask(li);
        });
        userInputEl.value = "";
      },
    },
  ]);

  modalContent.appendChild(div);
}
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

function deleteTask(li) {
  showModal("Are you sure you want to delete", [
    {
      text: "Go Back",
      onClick: () => modal.classList.remove("active"),
    },
    {
      text: "Delete",
      onClick: () => {
        showToast("task deleted");
        return tasks.removeChild(li);
      },
    },
  ]);
}

function taskCompleted(li) {
  showModal("Are you sure you completed the task", [
    { text: "Go back", onClick: () => modal.classList.remove("active") },
    {
      text: "Completed",
      onClick: () => {
        showToast("completed");
        li.style.textDecoration = "line-through";
        modal.classList.remove("active");
      },
    },
  ]);
}

function showToast(message) {
  modal.classList.remove("active");
  toastMessage.classList.add("active");
  toastMessage.innerHTML = message;
  setTimeout(() => {
    toastMessage.classList.remove("active");
    toastMessage.innerHTML = "";
  }, 2000);
}

function showModal(message, buttons) {
  modal.classList.add("active");
  modalContent.innerHTML = `${message}?`;
  const div = document.createElement("div");
  div.classList.add("sure-add-box");

  buttons.forEach((btn) => {
    let button = document.createElement("button");
    button.textContent = btn.text;
    button.addEventListener("click", btn.onClick);
    div.appendChild(button);
  });
  modalContent.appendChild(div);
}
