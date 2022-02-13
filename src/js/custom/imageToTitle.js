import getCoords from "./getCoords";

export default function imageToTitle() {
  if (document.documentElement.clientWidth > 1024 ) {
    const title = document.querySelector('.js-title');
    const imageContainer = document.querySelector('.js-image-container');
    const image = document.querySelector('.js-image');

    if (image && title && imageContainer) {
      const titleY = getCoords(title).top;
      const imageY = getCoords(image).top;

      const diff = imageY - titleY;

      image.style.width = `${image.clientWidth}px`
      image.style.position = 'absolute';
      image.style.top = `-${diff}px`;
      if (imageContainer.clientHeight <= image.clientHeight) {
        imageContainer.style.minHeight = `${image.clientHeight - diff}px`;
      }
    }
  }
}