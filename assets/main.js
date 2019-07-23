window.onload = function load() {
  class Slider {
    constructor(config) {
      const that = this;
      this.slider = document.getElementById(config.nameSlider);
      this.slideWrapper = document.getElementById(config.nameSliderWrapper);
      this.isArrows = config.isArrows;
      this.isPagination = config.isPagination;
      this.isSliderBlog = config.isSliderBlog;
      this.slides = this.slideWrapper.children;
      this.wrapperDots = this.slider.querySelector(config.namePaginationWrapper);
      this.arrows = this.slider.querySelectorAll('.arrows__item');

      if (this.isArrows) {
        this.addArrows();
        this.arrows = this.slider.querySelectorAll('.arrows__item');
      }

      if (this.isPagination) {
        this.addPagination();
      }

      this.dots = this.slider.querySelector('.pagination');
      [this.arrowLeft, this.arrowRight] = this.arrows;
      this.arrowRight.addEventListener('click', this.nextSlide.bind(that));
      this.arrowLeft.addEventListener('click', this.prevSlide.bind(that));
    }

    nextSlide() {
      const firstSlide = this.slides[0];
      const firstSlideClone = firstSlide.cloneNode(true);
      let slideNumber;

      if (this.isSliderBlog) {
        this.slideWrapper.appendChild(firstSlideClone);
        firstSlide.remove();
      } else {
        this.slideWrapper.style.transform = 'translateX(-100%)';
        this.slideWrapper.style.transition = '0.3s';

        setTimeout(() => {
          this.slideWrapper.appendChild(firstSlideClone);
          firstSlide.remove();
          this.slideWrapper.style.transform = 'translateX(0)';
          this.slideWrapper.style.transition = 'none';
        }, 300);

        slideNumber = this.slides[1].getAttribute('title').substring(5);
        this.dots.children[slideNumber].children[0].checked = true;
      }
    }

    prevSlide() {
      const lastSlide = this.slides[this.slides.length - 1];
      const lastSlideClone = lastSlide.cloneNode(true);
      let slideNumber;
      this.slideWrapper.insertBefore(lastSlideClone, this.slides[0]);
      lastSlide.remove();

      if (!this.isSliderBlog) {
        this.slideWrapper.style.left = '-100%';
        this.slideWrapper.style.transform = 'translateX(100%)';
        this.slideWrapper.style.transition = 'transform 0.3s';

        setTimeout(() => {
          this.slideWrapper.style.left = '0';
          this.slideWrapper.style.transform = 'translateX(0)';
          this.slideWrapper.style.transition = 'transform 0s';
        }, 300);

        slideNumber = this.slides[0].getAttribute('title').substring(5);
        this.dots.children[slideNumber].children[0].checked = true;
      }
    }

    addArrows() {
      const arrows = document.createElement('div');
      const arrowLeft = document.createElement('a');
      const arrowRight = document.createElement('a');

      arrows.className = 'arrows';
      arrowLeft.className = 'arrows__item arrows__item_left';
      arrowRight.className = 'arrows__item arrows__item_right';
      arrows.appendChild(arrowLeft);
      arrows.appendChild(arrowRight);

      if (this.isSliderBlog) {
        if (this.slides.length > 3) {
          this.slider.appendChild(arrows);
        }
      } else if (this.slides.length > 1) {
        this.slider.appendChild(arrows);
      }
    }

    renderDot(valueDot) {
      const dotWrapper = document.createElement('div');
      const dot = document.createElement('label');
      const dotInput = document.createElement('input');

      this.wrapperDots.className = 'pagination';
      dotWrapper.className = 'pagination__item';
      dot.setAttribute('for', `slide_${valueDot}`);
      dotInput.type = 'radio';
      dotInput.id = `slide_${valueDot}`;
      dotInput.name = 'slide';
      dotInput.value = `slide_${valueDot}`;

      if (valueDot === 0) {
        dotInput.checked = true;
      }

      dotWrapper.appendChild(dotInput);
      dotWrapper.appendChild(dot);
      dotInput.addEventListener('click', (e) => {
        const numDot = e.target.id.substring(6);
        let currentSlide = this.slides[0].getAttribute('title').substring(5);

        while (numDot !== currentSlide) {
          this.prevSlide();
          currentSlide = this.slides[0].getAttribute('title').substring(5);
        }
      });

      return dotWrapper;
    }

    addPagination() {
      if (this.slides.length > 1) {
        for (let i = 0; i < this.slides.length; i += 1) {
          this.wrapperDots.appendChild(this.renderDot(i));
        }
      }
    }
  }

  const config1 = new Slider({
    nameSlider: 'slider-slideshow-section',
    nameSliderWrapper: 'slide-wrapper',
    isSliderBlog: false,
    isArrows: true,
    isPagination: true,
    namePaginationWrapper: '.pagination',
  });
  const config2 = new Slider({
    nameSlider: 'slider-blog',
    nameSliderWrapper: 'post',
    isSliderBlog: true,
    isArrows: true,
    isPagination: false,
  });
};
