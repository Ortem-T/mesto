export default class UserInfo {
    constructor({profileName, profileAboutMe}) {
        this._nameValue = document.querySelector(profileName);
        this._aboutMeValue = document.querySelector(profileAboutMe);
        this._nameInput = document.querySelector('.form__input_type_name');
        this._aboutMeInput = document.querySelector('.form__input_type_about-me');
    }

    getUserInfo() {
        const userInfo = {}
        
        this._nameInput.value = this._nameValue.textContent;
        this._aboutMeInput.value = this._aboutMeValue.textContent;
        userInfo.name = this._nameInput.value;
        userInfo.aboutMe = this._aboutMeInput.value;
        
        return userInfo;
      }
    
    setUserInfo(userInfo) {
        this._nameValue.textContent = userInfo.name;
        this._aboutMeValue.textContent = userInfo.aboutme;
      }
}