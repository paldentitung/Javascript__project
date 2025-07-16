// fetch("https://official-joke-api.appspot.com/random_joke")
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//   });
const savedBtn = document.querySelector(".saved__btn");
const randomBtn = document.querySelector(".random__btn");
const joke = document.getElementById("joke");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal__content");
const modalCloseBtn = document.querySelector(".modal__close__btn");
const jokeSaved = document.getElementById("joke__saved");
const jokeSavedContainer = document.querySelector(".joke__saved__container");
const jokePunchline = document.querySelector(".joke__punchline");
const jokesetup = document.querySelector(".joke__setup");
let currentJoke = null;

async function JokeGenertor() {
  let res = await fetch("https://official-joke-api.appspot.com/random_joke");
  let data = await res.json();

  jokesetup.innerHTML = `${data.setup}`;

  setTimeout(() => {
    jokePunchline.innerHTML = `${data.punchline}`;
  }, 3000);

  currentJoke = data;
}
function savedJoke() {
  let li = document.createElement("li");
  let punchlineSpan = document.createElement("span");
  let setupSpan = document.createElement("span");
  let deletBtn = document.createElement("button");
  deletBtn.innerHTML = "&times;";
  deletBtn.classList.add("joke__delete");
  punchlineSpan.innerHTML = `PunchLine: ${currentJoke.punchline}`;
  setupSpan.innerHTML = `Setup: ${currentJoke.setup}`;
  let div = document.createElement("div");
  div.appendChild(setupSpan);
  div.appendChild(punchlineSpan);
  li.appendChild(div);

  li.appendChild(deletBtn);
  jokeSaved.appendChild(li);

  deletBtn.addEventListener("click", () => {
    modal.classList.add("active");
    modalContent.innerHTML = "are you sure you want to delete the joke";
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        jokeSaved.removeChild(li);
      }
    });
  });
}
randomBtn.addEventListener("click", JokeGenertor);
savedBtn.addEventListener("click", savedJoke);

modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
