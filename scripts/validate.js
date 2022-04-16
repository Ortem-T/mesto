const editProfileForm = document.querySelector('#form-profile');
const addCardForm = document.querySelector('#form-card');

const ERRORS = {
  wrongUrl: 'Введите адрес сайта',
  empty: 'Вы пропустили это поле',
};

const checkInputValidity = (input) => {
  input.setCustomValidity('');

  if (input.validity.valueMissing) {
    input.setCustomValidity(ERRORS.empty);
    return false;
  }

  const maxLangthValue = input.getAttribute('maxlength');

  if (input.validity.tooLong || input.validity.tooShort) {
    input.setCustomValidity(`Введите значение от 2 до ${maxLangthValue} символов`);
    return false;
  }

  if (input.validity.typeMismatch && input.type === "url") {
    input.setCustomValidity(ERRORS.wrongUrl);
    return false;
  }

  return input.checkValidity();
}

const validateInput = (input) => {
  const formError = input.parentNode.querySelector(`#${input.id}-error`);
  checkInputValidity(input);
  formError.textContent = input.validationMessage;
}; 

const setButtonState = (button, isValid) => {
  if (isValid) {
    button.disabled = false;
    button.classList.remove('form__save_invalid');
  } else {
    button.disabled = true;
    button.classList.add('form__save_invalid');
  }
}

const validateBorder = (input, isValid) => {
  if (isValid) {
    input.classList.remove('form__input_invalid');
  } else {
    input.classList.add('form__input_invalid');
  } 
}

const handleInput = (evt) => {
  const currentForm = evt.currentTarget;
  const input = evt.target;
  const submitButton = currentForm.querySelector('.form__save');

  validateInput(input);

  validateBorder(input, currentForm.checkValidity());

  setButtonState(submitButton, currentForm.checkValidity());
} 

const handleSubmit = (evt) => {
    evt.preventDefault();

    const currentForm = evt.target;
    if (currentForm.checkValidity()) {
      currentForm.reset();
    } 
 };

editProfileForm.addEventListener('submit', handleSubmit);
addCardForm.addEventListener('submit', handleSubmit);

editProfileForm.addEventListener('input', handleInput);
addCardForm.addEventListener('input', handleInput);