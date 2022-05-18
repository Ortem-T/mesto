export default class Card {
    constructor(data, selector, handleCardClick) {
      this._data = data,
      this._selector = selector,
      this._handleCardClick = handleCardClick
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
  
    _setEventListeners() {
      this._card.querySelector('.elements__del-button').addEventListener('click', () => this._handleDelCard(this._card));
      this._card.querySelector('.elements__like-button').addEventListener('click', () => this._handleLikeCard(this._card));
      this._card.querySelector('.elements__photo').addEventListener('click', () => this._handleCardClick());
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