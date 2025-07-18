const imageSlide = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next__btn");
const prevBtn = document.querySelector(".prev__btn");
let currentSlide = 0;

nextBtn.addEventListener("click", () => {
  currentSlide++;
  console.log(currentSlide);
  if (currentSlide === 1) {
    imageSlide[0].classList.remove("active");
    imageSlide[currentSlide].classList.add("active");
  }

  if (currentSlide === 2) {
    imageSlide[1].classList.remove("active");
    imageSlide[currentSlide].classList.add("active");
  }
  if (currentSlide === 3) {
    currentSlide = 0;
    imageSlide[2].classList.remove("active");
    imageSlide[currentSlide].classList.add("active");
  }
});

prevBtn.addEventListener("click", () => {
  currentSlide--;
  console.log(currentSlide);
  if (currentSlide === -1) {
    imageSlide[0].classList.remove("active");
    imageSlide[2].classList.add("active");
  }
  if (currentSlide === -2) {
    imageSlide[2].classList.remove("active");
    imageSlide[1].classList.add("active");
  }
  if (currentSlide === -3) {
    currentSlide = 0;
    imageSlide[1].classList.remove("active");
    imageSlide[0].classList.add("active");
  }
});
setInterval(() => {
  nextBtn.click();
}, 5000);
