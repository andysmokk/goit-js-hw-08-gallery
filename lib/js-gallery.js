"use strict";

var _app = _interopRequireDefault(require("./app.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var imagesContainerRef = document.querySelector('.js-gallery');
var lightboxRef = document.querySelector('.lightbox');
var lightboxOverlayRef = document.querySelector('.lightbox__overlay');
var lightboxContentRef = document.querySelector('.lightbox__content');
var lightboxImageRef = document.querySelector('.lightbox__image');
var lightboxButtonRef = document.querySelector('[data-action="close-lightbox"]');
var imgSetMarkup = createImgSetMarkup(_app["default"]);
imagesContainerRef.insertAdjacentHTML('beforeend', imgSetMarkup);

function createImgSetMarkup(images) {
  return images.map(function (_ref) {
    var preview = _ref.preview,
        original = _ref.original,
        description = _ref.description;
    return "\n    <li class=\"gallery__item\">\n  <a\n    class=\"gallery__link\"\n    href=\"".concat(original, "\"\n  >\n    <img\n      class=\"gallery__image\"\n      src=\"").concat(preview, "\"\n      data-source=\"").concat(original, "\"\n      alt=\"").concat(description, "\"\n    />\n  </a>\n</li>\n    ");
  }).join('');
}

;
imagesContainerRef.addEventListener('click', onImagesContainerClick);

function onImagesContainerClick(e) {
  e.preventDefault();
  var isTargetImgEl = e.target.classList.contains('gallery__image');

  if (!isTargetImgEl) {
    return;
  }

  ;
  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = e.target.dataset.source;
  lightboxImageRef.alt = e.target.alt;
  document.body.style.cssText += "height: 100%;\n   width: 100%;\n   position: fixed;\n   overflow: hidden;";
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);
}

;
lightboxButtonRef.addEventListener('click', onCloseModalBtnClick);

function onCloseModalBtnClick() {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
  document.body.style.cssText -= "height: 100%;\n   width: 100%;\n   position: fixed;\n   overflow: hidden;";
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);
}

;
lightboxOverlayRef.addEventListener('click', onOverlayClick);

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onCloseModalBtnClick();
  }

  ;
}

;

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
    onCloseModalBtnClick();
  }

  ;
}

;

var arrImg = _app["default"].map(function (el) {
  return el.original;
});

function onArrowKeyPress(e) {
  var currentImg = arrImg.indexOf(lightboxImageRef.src);
  console.log(lightboxImageRef.src);

  if (e.code === 'ArrowRight' && currentImg < _app["default"].length - 1) {
    lightboxImageRef.src = _app["default"][currentImg + 1].original;
  } else if (e.code === 'ArrowLeft' && currentImg > 0) {
    lightboxImageRef.src = _app["default"][currentImg - 1].original;
  }

  ;
}

;