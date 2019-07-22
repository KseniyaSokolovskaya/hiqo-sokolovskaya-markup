window.onload = function() {
  function toPlugSlider(
    nameSlider,
    nameSliderWrapper,
    isSliderBlog,
    isArrows,
    isPagination,
    namePaginationWrapper
  ) {
    const slider = document.getElementById(nameSlider);
    const slideWrapper = document.getElementById(nameSliderWrapper);
    const slides = slideWrapper.children;
    let wrapperDots = slider.querySelector(namePaginationWrapper);
    let arrows;
    let arrowRight;
    let arrowLeft;
    let dots;

    function renderArrows() {
      let arrows = document.createElement("div");
      let arrowLeft = document.createElement("a");
      let arrowRight = document.createElement("a");

      arrows.className = "arrows";
      arrowLeft.className = "arrows__item arrows__item_left";
      arrowRight.className = "arrows__item arrows__item_right";

      arrows.appendChild(arrowLeft);
      arrows.appendChild(arrowRight);
      return arrows;
      console.log(arrows);
    }

    function addArrows() {
      if (isSliderBlog) {
        if (slides.length > 3) {
          slider.appendChild(renderArrows());
        }
      } else {
        if (slides.length > 1) {
          slider.appendChild(renderArrows());
        }
      }
    }

    function renderDot(valueDot) {
      const dotWrapper = document.createElement("div");
      const dot = document.createElement("label");
      const dotInput = document.createElement("input");

      wrapperDots.className = "pagination";
      dotWrapper.className = "pagination__item";
      dot.setAttribute("for", `slide_${valueDot}`);
      dotInput.type = "radio";
      dotInput.id = `slide_${valueDot}`;
      dotInput.name = "slide";
      dotInput.value = `slide_${valueDot}`;
      valueDot === 0 && (dotInput.checked = true);

      dotWrapper.appendChild(dotInput);
      dotWrapper.appendChild(dot);
      dotInput.addEventListener("click", e => {
        let numDot = e.target.id.substring(6);
        let currentSlide = slides[0].getAttribute("title").substring(5);
        while (numDot !== currentSlide) {
          prevSlide();
          currentSlide = slides[0].getAttribute("title").substring(5);
        }
      });

      return dotWrapper;
    }

    function addPagination() {
      if (slides.length > 1) {
        for (let i = 0; i < slides.length; i++) {
          wrapperDots.appendChild(renderDot(i));
        }
      }
    }

    isArrows && addArrows();
    isPagination && addPagination();

    function nextSlide() {
      let firstSlide = slides[0];
      let firstSlideClone = firstSlide.cloneNode(true);
      let slideNumber;

      if (isSliderBlog) {
        slideWrapper.appendChild(firstSlideClone);
        firstSlide.remove();
      } else {
        slideWrapper.style.transform = "translateX(-100%)";
        slideWrapper.style.transition = "0.3s";

        setTimeout(() => {
          slideWrapper.appendChild(firstSlideClone);
          firstSlide.remove();
          slideWrapper.style.transform = "translateX(0)";
          slideWrapper.style.transition = "none";
        }, 300);

        slideNumber = slides[1].getAttribute("title").substring(5);
        dots.children[slideNumber].children[0].checked = true;
      }
    }
    function prevSlide() {
      let lastSlide = slides[slides.length - 1];
      let lastSlideClone = lastSlide.cloneNode(true);
      let slideNumber;
      slideWrapper.insertBefore(lastSlideClone, slides[0]);
      lastSlide.remove();

      if (!isSliderBlog) {
        slideWrapper.style.left = "-100%";
        slideWrapper.style.transform = "translateX(100%)";
        slideWrapper.style.transition = "transform 0.3s";

        setTimeout(() => {
          slideWrapper.style.left = "0";
          slideWrapper.style.transform = "translateX(0)";
          slideWrapper.style.transition = "transform 0s";
        }, 300);

        slideNumber = slides[0].getAttribute("title").substring(5);
        dots.children[slideNumber].children[0].checked = true;
      }
    }

    arrows = slider.querySelectorAll(".arrows__item");
    dots = slider.querySelector(".pagination");
    arrowLeft = arrows[0];
    arrowRight = arrows[1];
    arrowRight.addEventListener("click", nextSlide);
    arrowLeft.addEventListener("click", prevSlide);
  }

  toPlugSlider(
    "slider-slideshow-section",
    "slide-wrapper",
    false,
    true,
    true,
    ".pagination"
  );

  toPlugSlider("slider-blog", "post", true, true, false);
};
