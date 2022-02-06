import FormValidator from "../build-in/validation";


export default function initValidation() {
  const forms = Array.from(document.querySelectorAll('.js-init-validation'));
  forms.forEach(form => {
    const validation = new FormValidator({
      inputSelector: '.js-input',
      submitButtonSelector: '.form__submit',
      inactiveButtonClass: 'disabled',
      inputErrorClass: 'js-error',
      errorClass: 'invalid'
    }, form);

    validation.enableValidation();
  })
}