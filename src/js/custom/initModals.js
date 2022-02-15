import '../libs/hystmodal.min.js';

export default function initModals() {
  window.modalApi = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: (modal) => {
      // imageModal(modal);
      playVideo(modal);
    },
    afterClose: (modal) => {
      pauseVideo(modal);
    }
  });
}

function imageModal(modal) {
  if (modal.openedWindow.id == "image-modal") {
    const image = modal.starter.querySelector('.js-image');
    const modalImageElement = modal.openedWindow.querySelector('.js-image');
    if (image && modalImageElement) {
      modalImageElement.src = image.src;
      modalImageElement.alt = image.alt;
    }
  }
}

function playVideo(modal) {
  const video = modal.openedWindow.querySelector('video');
  if (video) {
    video.play();
  }
}

function pauseVideo(modal) {
  const video = modal.openedWindow.querySelector('video');
  if (video) {
    video.pause();
  }
}