import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._popup = document.querySelector(popupSelector);
        this._form = this._popup.querySelector('.form');
        this._input = this._form.querySelectorAll('.form__input');
    }

    _getInputValues() {
        const data = {};
        this._input.forEach((input) => {
            data[input.name] = input.value
        });
        return data;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    closeForm() {
        super.close();
        this._form.reset();
    }
}