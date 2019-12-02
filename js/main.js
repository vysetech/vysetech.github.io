// https://tympanus.net/codrops/2018/01/24/gradient-topography-animation/
// https://davidwalsh.name/javascript-debounce-function

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

class Blob {
  constructor(el, options) {
    this.DOM = {};
    this.DOM.el = el;
    this.options = {};
    Object.assign(this.options, options);
    this.init();
  }
  init() {
    this.rect = this.DOM.el.getBoundingClientRect();
    this.descriptions = [];
    this.layers = Array.from(this.DOM.el.querySelectorAll('path'), t => {
      t.style.transformOrigin = `${this.rect.left + this.rect.width / 2}px ${this.rect.top + this.rect.height / 2}px`;
      t.style.opacity = 0;
      this.descriptions.push(t.getAttribute('d'));
      return t;
    });

    window.addEventListener('resize', debounce(() => {
      this.rect = this.DOM.el.getBoundingClientRect();
      this.layers.forEach(layer => layer.style.transformOrigin = `${this.rect.left + this.rect.width / 2}px ${this.rect.top + this.rect.height / 2}px`);
    }, 20));
  }
  intro() {
    anime.remove(this.layers);
    anime({
      targets: this.layers,
      duration: 1800,
      delay: (t, i) => i * 120,
      easing: [0.2, 1, 0.1, 1],
      scale: [0.2, 1],
      opacity: {
        value: [0, 1],
        duration: 300,
        delay: (t, i) => i * 120,
        easing: 'linear'
      }
    });
  }
};

window.Blob = Blob;

const DOM = {};
let blobs = [];
DOM.svg = document.querySelector('svg.scene');
Array.from(DOM.svg.querySelectorAll('g')).forEach((el) => {
  const blob = new Blob(el);
  blobs.push(blob);
  blob.intro();
});

anime({
  targets: document.getElementsByClassName("logo"),
  duration: 1800,
  delay: (t, i) => i * 120,
  easing: [0.2, 1, 0.1, 1],
  scale: [0.2, 1],
  opacity: {
    value: [0, 1],
    duration: 300,
    delay: (t, i) => i * 120,
    easing: 'linear'
  }
});