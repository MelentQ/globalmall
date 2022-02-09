import IMask from 'imask';

export default function initPhoneMask() {
  const elements = Array.from(document.querySelectorAll('.js-phone-mask'));
  elements.forEach(element => {
    const maskOptions = {
      mask: '+{7} (000) 000-00-00'
    };
    const mask = IMask(element, maskOptions);
  })
}