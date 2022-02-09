import '../libs/hystmodal.min.js';

export default function initModals() {
  window.modalApi = new HystModal({
    linkAttributeName: "data-hystmodal",
    beforeOpen: (modal) => {
      imageModal(modal);
    }
  });
}

function imageModal(modal) {
  if (modal.openedWindow.id == "image-modal") {
    const image = modal.starter.querySelector('.js-image');
    const modalImageElement = modal.openedWindow.querySelector('.js-image');
    modalImageElement.src = image.src;
    modalImageElement.alt = image.alt;
  }
}