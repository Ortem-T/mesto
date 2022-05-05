export default class FormValidator {
    constructor(validationSettings, formElement) {
      this._validationSettings = validationSettings,
      this._formElement = formElement
    }
  
    _showInputError(formElement, inputElement, errorMessage, inputErrorClass, errorClass) {
      const formError = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(inputErrorClass);
      formError.textContent = errorMessage;
      formError.classList.add(errorClass);
    }
  
    _hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
      const formError = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(inputErrorClass);
      formError.classList.remove(errorClass);
      formError.textContent = '';
    }
  
    _isValid(formElement, inputElement, inputErrorClass, errorClass) {
      if (!inputElement.validity.valid) {
        this._showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
      } else {
        this._hideInputError(formElement, inputElement, inputErrorClass, errorClass);
      }
    };
  
    _disableButton(buttonElement, disableButtonClass) {
      buttonElement.classList.add(disableButtonClass);
      buttonElement.setAttribute('disabled', true);
    };
    
    _enableButton(buttonElement, disableButtonClass) {
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(disableButtonClass);
    };
    
    _toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
      if (this._hasInvalidInput(inputList)) {
        this._disableButton(buttonElement, inactiveButtonClass);
      } else {
        this._enableButton(buttonElement, inactiveButtonClass);
      }
    }; 
  
    _setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
      const inputList = Array.from(formElement.querySelectorAll(inputSelector));
      const buttonElement = formElement.querySelector(submitButtonSelector);
      this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
      inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
          this._isValid(formElement, inputElement, inputErrorClass, errorClass);
          this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
      });
    }; 
  
    enableValidation() {
      const {formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = this._validationSettings
      const formList = Array.from(document.querySelectorAll(formSelector));
    
      formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._disableButton(formElement.querySelector(submitButtonSelector), inactiveButtonClass);
        });
    
        this._setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
      });
    };
  
    _hasInvalidInput(inputList) {
      return inputList.some((inputElement) => {
    
        return !inputElement.validity.valid;
      })
    };
  }