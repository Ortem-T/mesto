export default class Card {
    constructor(data, selector, userId, handleCardClick, handleDelCardClick, handleLIkeCardClick) {      
      this._data = data;
      this._selector = selector;
      this._userId = userId;
      this._cardId = data._id;
      this._cardOwnerId = data.owner._id;
      this._likes = data.likes;
      this._handleCardClick = handleCardClick;
      this._handleDelCardClick = handleDelCardClick;
      this._handleLIkeCardClick = handleLIkeCardClick;
    }
  
    _getTemplateElement() {
      this._card = document.querySelector(this._selector).content.querySelector('.elements__item').cloneNode(true);
  
      return this._card;
    }

    _hasDelButton() {
      if (this._userId !== this._cardOwnerId) {
        this._card.querySelector('.elements__del-button').remove();
      }
    }
  
    handleDelCard() {
      this._card.remove();
    }
  
    updateLikes(likes) {
      this._likes = likes;
      this._card.querySelector('.elements__like-counter').textContent = likes.length;
    }

    toggleLikeButton(isActive) {
      if (isActive) {
        this._card.querySelector('.elements__like-button').classList.add('elements__like-button_active');
      } else {
        this._card.querySelector('.elements__like-button').classList.remove('elements__like-button_active');
      }
    }
  
    _setEventListeners() {
      this._card.querySelector('.elements__del-button').addEventListener('click', () => this._handleDelCardClick(this._cardId));
      this._card.querySelector('.elements__like-button').addEventListener('click', () => this._handleLIkeCardClick(this._likes));
      this._card.querySelector('.elements__photo').addEventListener('click', () => this._handleCardClick());
    }
  
    creationCard () {
      this._getTemplateElement();
      this._setEventListeners();
      this._hasDelButton();

      this.toggleLikeButton(this._likes.some((like) => like._id === this._userId));
  
      this._card.querySelector('.elements__title').textContent = this._data.name;
      this._card.querySelector('.elements__photo').src = this._data.link;
      this._card.querySelector('.elements__photo').alt = this._data.name;
      this._card.querySelector('.elements__like-counter').textContent = this._likes.length;
  
      return this._card
       
    }
  }