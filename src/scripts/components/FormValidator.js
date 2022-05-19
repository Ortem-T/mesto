export default class FormValidator {
    constructor(validationSettings, formElement) {
      this._validationSettings = validationSettings,
      this._formElement = formElement,
      this._inputSelector = validationSettings.inputSelector,
      this._submitButtonSelector = validationSettings.submitButtonSelector,
      this._inactiveButtonClass = validationSettings.inactiveButtonClass,
      this._inputErrorClass = validationSettings.inputErrorClass,
      this._errorClass = validationSettings.errorClass,
      this._buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    }
  
    _showInputError(inputElement, errorMessage) {
      const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._inputErrorClass);
      formError.textContent = errorMessage;
      formError.classList.add(this._errorClass);
    }
  
    _hideInputError(inputElement) {
      const formError = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._inputErrorClass);
      formError.classList.remove(this._errorClass);
      formError.textContent = '';
    }
  
    _isValid(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };
  
    _disableButton() {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    };
    
    _enableButton() {
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    };
    
    _toggleButtonState(inputList) {
      if (this._hasInvalidInput(inputList)) {
        this._disableButton();
      } else {
        this._enableButton();
      }
    }; 
  
    _setEventListeners() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      this._toggleButtonState(inputList);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(inputElement);
          this._toggleButtonState(inputList);
        });
      });
    }; 
  
    enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._disableButton();
      });
  
      this._setEventListeners();
    };
  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
    
        return !inputElement.validity.valid;
      })
    };

    resetErrors() {
      const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
      inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });

    }
  }