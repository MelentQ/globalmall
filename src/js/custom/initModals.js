import '../libs/hystmodal.min.js';

export default function initModals() {
  window.modalAPI = new HystModal({
    linkAttributeName: "data-hystmodal"
  });
}