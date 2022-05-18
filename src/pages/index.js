import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";

import { initialCards, validationSettings } from "../scripts/utils/constants.js";
const profileButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');
const imgTitle = document.querySelector('#card-title-img');
const imgLink = document.querySelector('#card-img');
const photoContainer = document.querySelector('.elements__list');
const formImg = document.querySelector('#form-card');
const formEdit = document.querySelector('#form-profile');

const validationPopupImg = new FormValidator(validationSettings, formImg);
const validationPopupEdit = new FormValidator(validationSettings, formEdit);
validationPopupImg.enableValidation();
validationPopupEdit.enableValidation();

function createCard(card) {
  return new Card (
    {...card}, 
    '#item-template', 
    () => openPopupImg.openImg(card.name, card.link)
  ).creationCard();
}

const section = new Section ({
  items: initialCards,
  renderer: (item) => {
    photoContainer.append(createCard(item));
  }
}, '.elements__list' 
)

section.rendererItems();

const openPopupImg = new PopupWithImage ('.popup_type_img-open');
openPopupImg.setEventListeners();

const createUserInfo = new UserInfo ({profileName: '.profile__name', profileAboutMe: '.profile__about-me'});

const profileForm = new PopupWithForm ('.popup_type_profile', 
    (userInfo) => {
      createUserInfo.setUserInfo(userInfo);
      profileForm.close();
    });
profileForm.setEventListeners();

function editProfile() {
    createUserInfo.getUserInfo();
    profileForm.open();
}

const addPhotoForm = new PopupWithForm ('.popup_type_img',
    () => {
      const newCard = {name: imgTitle.value, link: imgLink.value};
      section.addItem(createCard(newCard));
      addPhotoForm.closeForm() 
  })
addPhotoForm.setEventListeners();

profileButton.addEventListener('click', () => {
    editProfile();
});

photoAddButton.addEventListener('click', () => {
    addPhotoForm.open();
});