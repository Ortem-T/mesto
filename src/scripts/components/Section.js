export default class Section {
    constructor({renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    rendererItems(items) {
        items.forEach((item)=> {
            this._renderer(item);
        })
    }

    addItem(element) {
        this._container.prepend(element);
    }

    addItemContainer(element) {
        this._container.append(element);
    }
}