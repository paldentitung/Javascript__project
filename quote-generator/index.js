const quoteText = document.querySelector(".quote-text");
const quoteAuthor = document.querySelector(".quote-author");
const quoteBtn = document.querySelector(".quote-btn");
const savedBtn = document.querySelector(".saved-btn");
const ul = document.querySelector(".saved-quote ul");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".modal-close-btn");
let currentQuote = null;

// console.log(quoteText);
// console.log(quoteAuthor);
// console.log(quoteBtn);
// console.log(savedBtn);
// console.log(ul);

async function quoteGenerator() {
  let res = await fetch("http://localhost:3000/quotes");
  let data = await res.json();
  let randomeQuote = data[Math.floor(Math.random() * data.length)];
  quoteText.innerHTML = `${randomeQuote.text}`;
  quoteAuthor.innerHTML = `-${randomeQuote.author}`;

  currentQuote = randomeQuote;
}
function savedQuote() {
  let li = document.createElement("li");
  let quoteSpanText = document.createElement("span");

  let quoteSpanAuthor = document.createElement("span");
  let deleteBtn = document.createElement("button");
  quoteSpanText.innerHTML = `${currentQuote.text}`;
  quoteSpanAuthor.innerHTML = `-${currentQuote.author || "Unknown"}`;

  deleteBtn.innerHTML = "Delete";

  deleteBtn.addEventListener("click", () => {
    deleteQuote(li);
  });

  li.appendChild(quoteSpanText);
  li.appendChild(quoteSpanAuthor);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
  checkSavedQuotes();
}
function deleteQuote(li) {
  modalContent.innerHTML = "";
  modal.classList.add("active");
  let span = document.createElement("span");
  let delele = document.createElement("button");
  let goBack = document.createElement("button");
  let div = document.createElement("div");
  delele.innerHTML = "delete";
  goBack.innerHTML = "Go Back";
  span.innerHTML = "Do you want to remove it";

  goBack.addEventListener("click", () => {
    modal.classList.remove("active");
  });
  delele.addEventListener("click", () => {
    ul.removeChild(li);
    modal.classList.remove("active");
  });
  div.appendChild(goBack);
  div.appendChild(delele);
  modalContent.appendChild(span);
  modalContent.appendChild(div);
}
function checkSavedQuotes() {
  const emptyMsg = document.querySelector(".empty-msg");
  emptyMsg.style.display = ul.children.length === 0 ? "block" : "none";
}

quoteBtn.addEventListener("click", quoteGenerator);
savedBtn.addEventListener("click", savedQuote);
modalCloseBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
