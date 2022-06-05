export default class UserInfo {
  constructor({profileName, profileAboutMe, profileAvatar}) {
    this._nameValue = document.querySelector(profileName);
    this._aboutMeValue = document.querySelector(profileAboutMe);
    this._avatarValue = document.querySelector(profileAvatar);
    this._nameInput = document.querySelector('.form__input_type_name');
    this._aboutMeInput = document.querySelector('.form__input_type_about-me');
    this._avatarInput = document.querySelector('.form__input_type_avatar');
  }

  getUserInfo() {
    const userInfo = {}
    
    this._nameInput.value = this._nameValue.textContent;
    this._aboutMeInput.value = this._aboutMeValue.textContent;
    userInfo.name = this._nameInput.value;
    userInfo.aboutMe = this._aboutMeInput.value;
    userInfo.avatar = this._avatarInput.value;
    
    return userInfo;
  }
  
  setUserInfo(userInfo) {
    this._nameValue.textContent = userInfo.name;
    this._aboutMeValue.textContent = userInfo.about;
    this._avatarValue.src = userInfo.avatar;
  }
}