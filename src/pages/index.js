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
const formAvatar = document.querySelector('#form-avatar');
const nameInput = document.querySelector('.form__input_type_name');
const aboutMeInput = document.querySelector('.form__input_type_about-me');
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
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
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
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
        newCard.toggleLikeButton(false);
      } else {
        api.addLike(card._id)
          .then((data) => {
            newCard.updateLikes(data.likes);
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
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

const section = new Section ({
  renderer: (item) => {
    photoContainer.append(createCard(item));
  }
}, '.elements__list' 
);

let userId

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    createUserInfo.setUserInfo(userData);
    userId = userData._id;
    section.rendererItems(initialCards);
  })
  .catch((err) => {
     console.log(`Ошибка: ${err}`);
  });

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
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          profileForm.loading(false);
        });
    });
profileForm.setEventListeners();

function editProfile({username, aboutme}) {
  nameInput.value = username;
  aboutMeInput.value = aboutme;
}

const profileAvatar = new PopupWithForm ('.popup_type_avatar', 
    (userInfo) => {
      profileAvatar.loading(true);
      api.editAvatar({avatar: userInfo.avatarUrl})
      .then((data) => {
        createUserInfo.setUserInfo(data);
        profileAvatar.closeForm();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        profileAvatar.loading(false);
      });
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
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
        .finally(() => {
          addPhotoForm.loading(false);
        });
  })

addPhotoForm.setEventListeners();

profileButton.addEventListener('click', () => {
    const info = createUserInfo.getUserInfo();
    editProfile({
    username: info.name,
    aboutme: info.aboutMe
  });
    profileForm.open();
});

photoAddButton.addEventListener('click', () => {
    addPhotoForm.open();
});