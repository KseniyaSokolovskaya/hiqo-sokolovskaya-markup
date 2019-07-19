window.onload = function() {
  let slider = document.getElementById("slider"),
    wrapperDots = slider.querySelector(".pagination"),
    slideWrapper = document.getElementById("slide-wrapper"),
    slides = slideWrapper.children,
    arrows,
    arrowRight,
    dots,
    count = 0;

  function renderDot(valueDot) {
    let dotWrapper = document.createElement("div");
    let dot = document.createElement("label");
    let dotInput = document.createElement("input");

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
    return dotWrapper;
  }

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
  }

  function add() {
    if (slides.length > 1) {
      for (let i = 0; i < slides.length; i++) {
        wrapperDots.appendChild(renderDot(i));
      }
      slider.appendChild(renderArrows());
    } else {
    }
  }

  add();

  arrows = slider.querySelectorAll(".arrows__item");
  dots = slider.querySelector(".pagination");
  console.log(dots.children);
  arrowLeft = arrows[0];
  arrowRight = arrows[1];

  function next() {
    let first = slides[0],
      firstClone = first.cloneNode(true);
    slideWrapper.style.transform = "translateX(-100%)";
    slideWrapper.style.transition = "0.3s";

    setTimeout(() => {
      slideWrapper.appendChild(firstClone);
      first.remove();
      slideWrapper.style.transform = "translateX(0)";
      slideWrapper.style.transition = "none";
    }, 300);

    let slideNumber = slides[1].getAttribute("title").substring(5);
    dots.children[slideNumber].children[0].checked = true;
  }
  function prev() {
    let last = slides[slides.length - 1],
      lastClone = last.cloneNode(true);
    slideWrapper.insertBefore(lastClone, slides[0]);
    last.remove();
    slideWrapper.style.left = "-100%";
    slideWrapper.style.transform = "translateX(100%)";
    slideWrapper.style.transition = "transform 0.3s";

    setTimeout(() => {
      slideWrapper.style.left = "0";
      slideWrapper.style.transform = "translateX(0)";
      slideWrapper.style.transition = "transform 0s";
    }, 300);

    let slideNumber = slides[0].getAttribute("title").substring(5);
    dots.children[slideNumber].children[0].checked = true;
  }

  arrowRight.addEventListener("click", next);
  arrowLeft.addEventListener("click", prev);
};
