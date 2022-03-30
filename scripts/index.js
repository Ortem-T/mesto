const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const ESC_KEY = "Escape";
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_type_name');
const aboutMeInput = formElement.querySelector('.form__input_type_about-me');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me'); 
const popupProfile = document.querySelector('.popup_type_profile');
const popupImg = document.querySelector('.popup_type_img');

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

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp)
}

function editProfile() {
    openPopup(popupProfile)

    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
}

function closePopup() {
    const currentPopup = document.querySelector('.popup_opened');
    currentPopup.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp)
}

function onDocumentKeyUp(event){
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

editButton.addEventListener('click', (event) => {
    editProfile()
});

addButton.addEventListener('click', (event) => {
    openPopup(popupImg)
});


for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', closePopup);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    closePopup();
}

formElement.addEventListener('submit', handleProfileFormSubmit);