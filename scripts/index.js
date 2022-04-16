const profileButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');
const popupElement = document.querySelector('.popup');
const exitButtons = document.querySelectorAll('.popup__close');
const ESC_KEY = "Escape";
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__input_type_name');
const aboutMeInput = formElement.querySelector('.form__input_type_about-me');
const imgTitle = document.querySelector('#card-title-img');
const imgLink = document.querySelector('#card-img');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me'); 
const popupProfile = document.querySelector('.popup_type_profile');
const popupImg = document.querySelector('.popup_type_img');
const popupImgOpen = document.querySelector('.popup_type_img-open');
const photoContainer = document.querySelector('.elements__list');
const formImg = document.querySelector('#form-card');
const imgOpenTitle = document.querySelector('.popup__photo-caption');
const imgOpenSrc = document.querySelector('.popup__photo');
const elementsTemplate = document.querySelector('#item-template');
let currentPopup;

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

const handleDelCard = (element) => {
    element.remove();
}

const handleLikeCard = (element) => {
    element.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
}    

const handleClickCard = (element) => {
    openPopup (popupImgOpen);
    imgOpenTitle.textContent = element.querySelector('.elements__title').textContent;
    imgOpenSrc.src = element.querySelector('.elements__photo').src;
}

const creationCard = (card) => {
    const cardClone = elementsTemplate.content.querySelector('.elements__item').cloneNode(true);
    cardClone.querySelector('.elements__title').textContent = card.name;
    cardClone.querySelector('.elements__photo').src = card.link;
    cardClone.querySelector('.elements__photo').alt = card.name;
    cardClone.querySelector('.elements__del-button').addEventListener('click', () => handleDelCard(cardClone));
    cardClone.querySelector('.elements__like-button').addEventListener('click', () => handleLikeCard(cardClone));
    cardClone.querySelector('.elements__photo').addEventListener('click', () => handleClickCard(cardClone));
    
    return cardClone; 
}

function generateCards() {
    photoContainer.innerHTML = '';
    initialCards.forEach((item) => {
        const cardElement = creationCard(item);
        photoContainer.append(cardElement);
    });
}

generateCards();

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened');
    document.addEventListener('keyup', onDocumentKeyUp);
    currentPopup = popupElement;
}

document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
  });

function editProfile() {
    openPopup(popupProfile)

    nameInput.value = profileName.textContent;
    aboutMeInput.value = profileAboutMe.textContent;
}

function onDocumentKeyUp(event){
    if (event.key === ESC_KEY) {
        closePopup();
    }
}

function closePopup() { 
    currentPopup.classList.remove('popup_opened');
    currentPopup = undefined;
    document.removeEventListener('keyup', onDocumentKeyUp);
}

profileButton.addEventListener('click', (event) => {
    editProfile()
});

photoAddButton.addEventListener('click', (event) => {
    openPopup(popupImg)
});

for (let i = 0; i < exitButtons.length; i++) {
    exitButtons[i].addEventListener('click', closePopup);
}

function handleProfileFormSubmit (evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileAboutMe.textContent = aboutMeInput.value;
    closePopup();
}

function handleAddPhotoFormSubmit (evt) {
    evt.preventDefault();
 
    const newCard = creationCard({name: imgTitle.value, link: imgLink.value});
    photoContainer.prepend(newCard);
    formImg.reset();
    closePopup();
}



formElement.addEventListener('submit', handleProfileFormSubmit);
formImg.addEventListener('submit', handleAddPhotoFormSubmit);
