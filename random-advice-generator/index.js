const adviceEl = document.querySelector(".advice-sentence");
const RandomAdviceBtn = document.querySelector(".random-advice-btn");
const savedAdviceEl = document.querySelector(".saved-advice");
const savedAdviceBtn = document.querySelector(".saved-advice-btn");
let advicedata;

console.log(adviceEl);
console.log(RandomAdviceBtn);
async function RandomAdvice() {
  try {
    let res = await fetch("https://api.adviceslip.com/advice");
    let data = await res.json();
    adviceEl.style.opacity = 0;
    advicedata = data.slip.advice;

    setTimeout(() => {
      adviceEl.textContent = data.slip.advice;
      adviceEl.style.opacity = 1;
    }, 500);
  } catch (error) {
    alert("error is " + error);
  }
}
RandomAdviceBtn.addEventListener("click", RandomAdvice);

setInterval(RandomAdvice, 5000);

function getSavedAdvice() {
  const saved = localStorage.getItem("savedAdvice");
  if (!saved || saved === "undefined") return [];
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error("Error parsing saved advice:", e);
    localStorage.removeItem("savedAdvice");
    return [];
  }
}

function savedAdvice() {
  if (!advicedata) return;

  const saved = getSavedAdvice();
  saved.push(advicedata);
  localStorage.setItem("savedAdvice", JSON.stringify(saved));

  renderSavedAdvice();
}

function renderSavedAdvice() {
  savedAdviceEl.innerHTML = "";
  const saved = getSavedAdvice();

  if (saved.length === 0) {
    savedAdviceEl.innerHTML = "<li>No saved advice yet</li>";
    return;
  }

  saved.forEach((advice, index) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const button = document.createElement("button");

    span.textContent = advice;
    button.textContent = "Delete";
    button.classList.add("delete-btn");

    button.addEventListener("click", () => {
      const updated = getSavedAdvice().filter((_, i) => i !== index);
      localStorage.setItem("savedAdvice", JSON.stringify(updated));
      renderSavedAdvice();
    });

    li.appendChild(span);
    li.appendChild(button);
    savedAdviceEl.appendChild(li);
  });
}

savedAdviceBtn.addEventListener("click", savedAdvice);

// Initial render on page load
renderSavedAdvice();
