import './index.css'

import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupConfirmation from '../scripts/components/PopupConfirmation';
import Api from '../scripts/components/Api';

import { validationSettings } from "../scripts/utils/constants.js";
const profileButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');
const imgTitle = document.querySelector('#card-title-img');
const imgLink = document.querySelector('#card-img');
const photoContainer = document.querySelector('.elements__list');
const formImg = document.querySelector('#form-card');
const formEdit = document.querySelector('#form-profile');
const formAvatar = document.querySelector('#form-avatar')
const editAvatarButton = document.querySelector('.profile__avatar-button');
const config = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '62731dcc-205e-4eca-8046-563c23fbdff8',
    'Content-Type': 'application/json'
  }
};

const validationPopupImg = new FormValidator(validationSettings, formImg);
const validationPopupEdit = new FormValidator(validationSettings, formEdit);
const validationPopupAvatar = new FormValidator(validationSettings, formAvatar)
validationPopupImg.enableValidation();
validationPopupEdit.enableValidation();
validationPopupAvatar.enableValidation();

function createCard(card) {
  const newCard = new Card (
    {...card}, 
    '#item-template',
    userId, 
    () => openPopupImg.openImg(card.name, card.link),
    (cardId) => {
      confirmationPopupDelCard.open();
      confirmationPopupDelCard.submitCallbackDel(() => {
        api.deleteCard(cardId)
        .then(() => {
          confirmationPopupDelCard.close();
          newCard.handleDelCard();
        })
      })
    },
    (likes) => {
      const isLike = likes.some((like) => {
        return like._id === userId;
      });
      if (isLike) {
        api.deleteLike(card._id)
          .then((data) => {
            newCard.updateLikes(data.likes);
        });
        newCard.toggleLikeButton(false);
      } else {
        api.addLike(card._id)
          .then((data) => {
            newCard.updateLikes(data.likes);
        });
        newCard.toggleLikeButton(true);
      }
    }
  );
  
  return newCard.creationCard();
}

const confirmationPopupDelCard = new PopupConfirmation('.popup_type_del');
confirmationPopupDelCard.setEventListeners();

const api = new Api(config);

let section;

api.getInitialCards()
  .then(data => {
    section = new Section ({
      items: data,
      renderer: (item) => {
        photoContainer.append(createCard(item));
      }
    }, '.elements__list' 
    )
    
    section.rendererItems();
});

let userId

api.getUserInfo()
  .then((data) => {
    createUserInfo.setUserInfo(data);
    userId = data._id;
  })

const openPopupImg = new PopupWithImage ('.popup_type_img-open');
openPopupImg.setEventListeners();

const createUserInfo = new UserInfo ({
  profileName: '.profile__name', 
  profileAboutMe: '.profile__about-me',
  profileAvatar: '.profile__avatar'
});

const profileForm = new PopupWithForm ('.popup_type_profile', 
    (userInfo) => {
      profileForm.loading(true);
      api.editProfile({name: userInfo.name, about: userInfo.aboutme})
        .then((data) => {
          createUserInfo.setUserInfo(data);
          profileForm.close();
          profileForm.loading(false);
        })
    });
profileForm.setEventListeners();

function editProfile() {
  createUserInfo.getUserInfo();
  profileForm.open();
}

const profileAvatar = new PopupWithForm ('.popup_type_avatar', 
    (userInfo) => {
      profileAvatar.loading(true);
      api.editAvatar({avatar: userInfo.avatarUrl})
      .then((data) => {
        createUserInfo.setUserInfo(data);
        profileAvatar.close();
      })
    }
)

profileAvatar.setEventListeners();

editAvatarButton.addEventListener('click', () => {
  profileAvatar.open();
});

const addPhotoForm = new PopupWithForm ('.popup_type_img',
    () => {
      addPhotoForm.loading(true);
      api.addCard({name: imgTitle.value, link: imgLink.value})
        .then(data => {
          section.addItem(createCard(data));
          addPhotoForm.closeForm() 
        })
  })

addPhotoForm.setEventListeners();

profileButton.addEventListener('click', () => {
    editProfile();
});

photoAddButton.addEventListener('click', () => {
    addPhotoForm.open();
});