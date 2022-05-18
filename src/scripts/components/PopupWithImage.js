import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._imgOpenTitle = this._popup.querySelector('.popup__photo-caption');
        this._imgOpenSrc = this._popup.querySelector('.popup__photo');
    }

    openImg (name, link) {
        this._imgOpenSrc.src = link;
        this._imgOpenTitle.textContent = name;
        this._imgOpenSrc.alt = name;
        super.open();
    }
}