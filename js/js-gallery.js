import galleryItems from './app.js';

const imagesContainerRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.lightbox');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxContentRef = document.querySelector('.lightbox__content');
const lightboxImageRef = document.querySelector('.lightbox__image');
const lightboxButtonRef = document.querySelector('[data-action="close-lightbox"]');

console.log(lightboxImageRef)

const imgSetMarkup = createImgSetMarkup(galleryItems);
imagesContainerRef.insertAdjacentHTML('beforeend', imgSetMarkup);

function createImgSetMarkup(images) {
  return images.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `;
  }).join('');
};

imagesContainerRef.addEventListener('click', onImagesContainerClick);
function onImagesContainerClick(e) {
  e.preventDefault();

  const isTargetImgEl = e.target.classList.contains('gallery__image');
  
  if (!isTargetImgEl) {
    return;
  };
  
  lightboxRef.classList.add('is-open');
  lightboxImageRef.src = e.target.dataset.source;
  lightboxImageRef.alt = e.target.alt;
  document.body.style.cssText += `height: 100%;
   width: 100%;
   position: fixed;
   overflow: hidden;`
  
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);
};

lightboxButtonRef.addEventListener('click', onCloseModalBtnClick);
function onCloseModalBtnClick () {
  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
  lightboxImageRef.alt = '';
  document.body.style.cssText -= `height: 100%;
   width: 100%;
   position: fixed;
   overflow: hidden;`
  
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);

};

lightboxOverlayRef.addEventListener('click', onOverlayClick);
function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onCloseModalBtnClick()
  };
};

function onEscKeyPress(e) {
  if (e.code === 'Escape') {
  onCloseModalBtnClick();
  };
};

const arrImg = galleryItems.map(el => el.original);
function onArrowKeyPress(e) {
  const currentImg = arrImg.indexOf(lightboxImageRef.src);
  console.log(lightboxImageRef.src)
  if (e.code === 'ArrowRight' && currentImg < galleryItems.length - 1) {
    lightboxImageRef.src = galleryItems[currentImg + 1].original;
  } else if (e.code === 'ArrowLeft' && currentImg > 0) {
    lightboxImageRef.src = galleryItems[currentImg - 1].original;
  };
};