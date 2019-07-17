window.onload = function() {
  let slider = document.getElementById("slider");
  let arrows = slider.querySelectorAll(".arrows__item");
  let arrowLeft = arrows[0];
  let arrowRight = arrows[1];
  let slideWrapper = slider.querySelector(".slide-wrapper");
  let leftPosition = parseInt(getComputedStyle(slideWrapper).left);

  arrowLeft.addEventListener("click", () => {
    leftPosition += 100;
    slideWrapper.style.left = leftPosition + "%";
  });

  arrowRight.addEventListener("click", () => {
    leftPosition -= 100;
    slideWrapper.style.left = leftPosition + "%";
  });
};
