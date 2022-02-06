export default class FormValidator {
  /**
   * 
   * @param {Object} selectors - Селекторы, их очень много...
   * @param {*} formElement - Элемент формы, который надо валидировать
   */
  constructor(selectors, formElement, showErrors = false, errorElementPostfix = '-error') {
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;

    this._formElement = formElement;

    this.inputList = Array.from(this._formElement.querySelectorAll(selectors.inputSelector));

    this._errorElementPostfix = errorElementPostfix;
    this._showErrors = showErrors;
  }

  /**
   * Включает валидацию элемента формы formElement
   */
  enableValidation() {
    this._setEventListeners()
  }

  _setEventListeners() {
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this.inputList.forEach(inputElement => {
      inputElement.addEventListener('input', evt => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  /**
   * Включает или отключает кнопку сабмита формы в зависимости от валидности формы
   */
  _toggleButtonState() {
    if (this._isInputListInvalid(this.inputList)) {
      this.disableSubmitButton();
    }
    else {
      this.enableSubmitButton();
    }
  }

  /**
   * Отключает кнопку сабмита
   */
  disableSubmitButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  /**
   * Включает кнопку сабмита
   */
  enableSubmitButton() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _isInputListInvalid() {
    return this.inputList.some(
      inputElement => !inputElement.validity.valid
    )
  }

  /**
   * Проверяет валидность поля inputElement
   * @param {*} inputElement - поле ввода
   */
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    }
    else {
      this._showInputError(inputElement, inputElement.validationMessage);
    }
  }

  _showInputError(inputElement, errorMessage) {
    if (this._showErrors) {
      this._errorElement = this._formElement.querySelector(`#${inputElement.id}${this._errorElementPostfix}`);
      this._errorElement.textContent = errorMessage;
      this._errorElement.classList.add(this._errorClass);
    }
    inputElement.classList.add(this._inputErrorClass)
  }
  
  /**
   * Скрывает сообщение об ошибке валидации
   * @param {*} inputElement - элемент ввода
   */
  _hideInputError(inputElement) {
    if (this._showErrors) {
      this._errorElement = this._formElement.querySelector(`#${inputElement.id}${this._errorElementPostfix}`);
      this._errorElement.textContent = "";
      this._errorElement.classList.remove(this._errorClass);
    }
    inputElement.classList.remove(this._inputErrorClass)
  }

  /**
   * Сбрасывает ошибки полей ввода (только визуально)
   */
  resetInputsError() {
    this.inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
  }
}