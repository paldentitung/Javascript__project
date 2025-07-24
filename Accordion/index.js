const accordionHeading = document.querySelectorAll(".Accordion-heading");
const accordioncontent = document.querySelectorAll(".Accordion-content");

// console.log(accordionHeading);
// console.log(accordioncontent);

accordionHeading.forEach((heading) => {
  heading.addEventListener("click", () => {
    const content = heading.nextElementSibling;
    // console.log(content);
    accordioncontent.forEach((item) => {
      if (item !== content) {
        item.classList.remove("active");
      }
    });
    content.classList.toggle("active");
  });
});
