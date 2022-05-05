import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const profileButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');
const ESC_KEY = "Escape";
const form = document.querySelector('.form');
const nameInput = form.querySelector('.form__input_type_name');
const aboutMeInput = form.querySelector('.form__input_type_about-me');
const imgTitle = document.querySelector('#card-title-img');
const imgLink = document.querySelector('#card-img');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me'); 
const popupProfile = document.querySelector('.popup_type_profile');
const popupImg = document.querySelector('.popup_type_img');
const photoContainer = document.querySelector('.elements__list');
const formImg = document.querySelector('#form-card');
const formEdit = document.querySelector('#form-profile');

const initialCards = [
    {
      name: 'Подольск',
      link: './images/podolsk.jpg'
    },
    {
      name: 'Рускеала',
      link: './images/ruskeala.jpg'
    },
    {
      name: 'Гусиноозерск',
      link: './images/gusinoozersk.jpg'
    },
    {
      name: 'Южно-Сахалинск',
      link: './images/yuzhno-sakhalinsk.jpg'
    },
    {
      name: 'Солнечнодольск',
      link: './images/solnechnodolsk.jpg'
    },
    {
      name: 'Тверь',
      link: './images/tver.jpg'
    }
];

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_invalid',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'error__active'
};

const validationPopupImg = new FormValidator(validationSettings, formImg);
const validationPopupEdit = new FormValidator(validationSettings, formEdit);
validationPopupImg.enableValidation();
validationPopupEdit.enableValidation();

function createCard(card) {
  return new Card ({...card, openPopup: openPopup}, '#item-template').creationCard();
}

function generateCards() {
    photoContainer.innerHTML = '';
    initialCards.forEach((item) => {
        photoContainer.append(createCard(item));
    });
}

generateCards();

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
}

function editProfile() {
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
    openPopup(popupProfile)
}

function onDocumentKeyUp(event){
    if (event.key === ESC_KEY) {
        const activePopup = document.querySelector('.popup_opened')
        closePopup(activePopup);
    }
}

function closePopup(popup) { 
    popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp);
}

profileButton.addEventListener('click', (event) => {
    editProfile()
});

photoAddButton.addEventListener('click', (event) => {
    openPopup(popupImg);
});

const popupList = Array.from(document.querySelectorAll('.popup'));
popupList.forEach( (popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')){
        closePopup(popup);
      };
    });
  });

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    closePopup(popupProfile);
}

function handleAddPhotoFormSubmit (evt) {
    evt.preventDefault();
 
    const newCard = {name: imgTitle.value, link: imgLink.value};
    photoContainer.prepend(createCard(newCard));
    closePopup(popupImg);
    formImg.reset();
}

form.addEventListener('submit', handleProfileFormSubmit);
formImg.addEventListener('submit', handleAddPhotoFormSubmit);