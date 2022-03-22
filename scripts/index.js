const editButton = document.querySelector('.profile__edit-button');
const popupElement = document.querySelector('.popup');
const closeButton = popupElement.querySelector('.popup__close');
const ESC_KEY = "Escape";
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_type_name');
const aboutMeInput = formElement.querySelector('.form__input_type_about-me');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me'); 

function openPopup() {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp)
    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
    document.removeEventListener('keyup', onDocumentKeyUp)
}

function onDocumentKeyUp(event){
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

editButton.addEventListener('click', (event) => {
    openPopup()
});

closeButton.addEventListener('click', closePopup)

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    closePopup();

}

formElement.addEventListener('submit', handleProfileFormSubmit);