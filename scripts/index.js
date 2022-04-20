const profileButton = document.querySelector('.profile__edit-button');
const photoAddButton = document.querySelector('.profile__add-button');
const body = document.querySelector('.body');
const popupElement = document.querySelector('.popup');
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
const popupImgOpen = document.querySelector('.popup_type_img-open');
const photoContainer = document.querySelector('.elements__list');
const formImg = document.querySelector('#form-card');
const imgOpenTitle = document.querySelector('.popup__photo-caption');
const imgOpenSrc = document.querySelector('.popup__photo');
const elementsTemplate = document.querySelector('#item-template');

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
    const elementText = element.querySelector('.elements__title').textContent;
    imgOpenTitle.textContent = elementText;
    imgOpenSrc.alt = elementText;
    imgOpenSrc.src = element.querySelector('.elements__photo').src;
    
    openPopup (popupImgOpen);
}

const creationCard = (card) => {
    const cardClone = elementsTemplate.content.querySelector('.elements__item').cloneNode(true);
    const cardClonePhoto = cardClone.querySelector('.elements__photo');
    
    cardClone.querySelector('.elements__title').textContent = card.name;
    cardClonePhoto.src = card.link;
    cardClonePhoto.alt = card.name;
    cardClone.querySelector('.elements__del-button').addEventListener('click', () => handleDelCard(cardClone));
    cardClone.querySelector('.elements__like-button').addEventListener('click', () => handleLikeCard(cardClone));
    cardClonePhoto.addEventListener('click', () => handleClickCard(cardClone));
    
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
        formImg.reset();
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
        formImg.reset();
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
 
    const newCard = creationCard({name: imgTitle.value, link: imgLink.value});
    photoContainer.prepend(newCard);
    closePopup(popupImg);
    formImg.reset();
}

form.addEventListener('submit', handleProfileFormSubmit);
formImg.addEventListener('submit', handleAddPhotoFormSubmit);
