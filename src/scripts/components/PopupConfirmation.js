import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.form');
    }

    submitCallbackDel(remov) {
        this._handleSubmit = remov;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }
}