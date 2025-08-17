// DOM elements
const quoteTextEl = document.querySelector(".quote-text");
const quoteAuthorEl = document.querySelector(".quote-author");
const generateBtn = document.querySelector(".quote-btn");
const saveBtn = document.querySelector(".saved-btn");
const savedListEl = document.querySelector(".saved-quote ul");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const modalCloseBtn = document.querySelector(".modal-close-btn");

let currentQuote = null;

// Fetch and display a random quote
async function generateRandomQuote() {
  try {
    const res = await fetch("http://localhost:3000/quotes");
    const data = await res.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];

    quoteTextEl.textContent = randomQuote.text;
    quoteAuthorEl.textContent = `-${randomQuote.author || "Unknown"}`;

    currentQuote = randomQuote;
  } catch (err) {
    alert("Failed to fetch quotes: " + err);
  }
}

// Get saved quotes from localStorage
function getSavedQuotes() {
  try {
    const savedData = localStorage.getItem("savedQuote");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      return parsed.quotes || [];
    }
    return [];
  } catch (err) {
    alert("Error reading saved quotes: " + err);
    return [];
  }
}

// Save current quote
function saveCurrentQuote() {
  if (!currentQuote) return alert("No quote to save!");

  const savedArray = getSavedQuotes();
  const newQuote = {
    id: Date.now(),
    text: currentQuote.text,
    author: currentQuote.author || "Unknown",
  };

  savedArray.push(newQuote);
  localStorage.setItem("savedQuote", JSON.stringify({ quotes: savedArray }));
  renderSavedQuotes();
}

// Render saved quotes
function renderSavedQuotes() {
  savedListEl.innerHTML = "";
  const savedArray = getSavedQuotes();

  savedArray.forEach((quote, index) => {
    const li = document.createElement("li");
    const textSpan = document.createElement("span");
    const authorSpan = document.createElement("span");
    const deleteBtn = document.createElement("button");

    textSpan.textContent = quote.text;
    authorSpan.textContent = `-${quote.author}`;
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => showDeleteModal(index));

    li.append(textSpan, authorSpan, deleteBtn);
    savedListEl.appendChild(li);
  });

  checkEmptyMessage();
}

// Show or hide "No quotes saved" message
function checkEmptyMessage() {
  const emptyMsg = document.querySelector(".empty-msg");
  emptyMsg.style.display = savedListEl.children.length === 0 ? "block" : "none";
}

// Show delete confirmation modal
function showDeleteModal(index) {
  modalContent.innerHTML = "";

  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  const btnContainer = document.createElement("div");

  span.textContent = "Do you want to remove this quote?";
  deleteBtn.textContent = "Delete";
  cancelBtn.textContent = "Cancel";

  cancelBtn.addEventListener("click", () => modal.classList.remove("active"));

  deleteBtn.addEventListener("click", () => {
    const savedArray = getSavedQuotes();
    savedArray.splice(index, 1);
    localStorage.setItem("savedQuote", JSON.stringify({ quotes: savedArray }));
    modal.classList.remove("active");
    renderSavedQuotes();
  });

  btnContainer.append(cancelBtn, deleteBtn);
  modalContent.append(span, btnContainer);
  modal.classList.add("active");
}

// Event listeners
generateBtn.addEventListener("click", generateRandomQuote);
saveBtn.addEventListener("click", saveCurrentQuote);
modalCloseBtn.addEventListener("click", () => modal.classList.remove("active"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("active");
});

// Initial render
renderSavedQuotes();
