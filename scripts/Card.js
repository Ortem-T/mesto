export default class Card {
    _popupImgOpen = document.querySelector('.popup_type_img-open');
    _imgOpenTitle = this._popupImgOpen.querySelector('.popup__photo-caption');
    _imgOpenSrc = this._popupImgOpen.querySelector('.popup__photo');
  
    constructor(data, selector) {
      this._data = data,
      this._selector = selector
    }
  
    _getTemplateElement() {
      this._card = document.querySelector(this._selector).content.querySelector('.elements__item').cloneNode(true);
  
      return this._card;
    }
  
    _handleDelCard() {
      this._card.remove();
    }
  
    _handleLikeCard() {
      this._card.querySelector('.elements__like-button').classList.toggle('elements__like-button_active');
    }
  
    _handleClickCard({name, link}) {
      this._imgOpenTitle.textContent = name;
      this._imgOpenSrc.alt = name;
      this._imgOpenSrc.src = link;
      
      this._data.openPopup(this._popupImgOpen);
    }
  
    _setEventListeners() {
      this._card.querySelector('.elements__del-button').addEventListener('click', () => this._handleDelCard(this._card));
      this._card.querySelector('.elements__like-button').addEventListener('click', () => this._handleLikeCard(this._card));
      this._card.querySelector('.elements__photo').addEventListener('click', () => this._handleClickCard(this._data));
    }
  
    creationCard () {
      this._getTemplateElement();
      this._setEventListeners();
  
      this._card.querySelector('.elements__title').textContent = this._data.name;
      this._card.querySelector('.elements__photo').src = this._data.link;
      this._card.querySelector('.elements__photo').alt = this._data.name;
  
      return this._card
       
    }
  }