const podolsk = new URL('../../images/podolsk.jpg', import.meta.url);
const ruskealla = new URL('../../images/ruskeala.jpg', import.meta.url);
const gusinoozersk = new URL('../../images/gusinoozersk.jpg', import.meta.url);
const sahalin = new URL('../../images/yuzhno-sakhalinsk.jpg', import.meta.url);
const solnechnodolsk = new URL('../../images/solnechnodolsk.jpg', import.meta.url);
const tver = new URL('../../images/tver.jpg', import.meta.url);

export const initialCards = [
    {
      name: 'Подольск',
      link: podolsk
    },
    {
      name: 'Рускеала',
      link: ruskealla
    },
    {
      name: 'Гусиноозерск',
      link: gusinoozersk
    },
    {
      name: 'Южно-Сахалинск',
      link: sahalin
    },
    {
      name: 'Солнечнодольск',
      link: solnechnodolsk
    },
    {
      name: 'Тверь',
      link: tver
    }
];

export const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save',
  inactiveButtonClass: 'form__save_invalid',
  inputErrorClass: 'form__input_invalid',
  errorClass: 'error__active'
};