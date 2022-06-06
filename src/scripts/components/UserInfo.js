export default class UserInfo {
  constructor({profileName, profileAboutMe, profileAvatar}) {
    this._nameValue = document.querySelector(profileName);
    this._aboutMeValue = document.querySelector(profileAboutMe);
    this._avatarValue = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    const userInfo = {}
    
    userInfo.name = this._nameValue.textContent;
    userInfo.aboutMe = this._aboutMeValue.textContent;
    userInfo.avatar = this._avatarValue.src;
    
    return userInfo;
  }
  
  setUserInfo(userInfo) {
    this._nameValue.textContent = userInfo.name;
    this._aboutMeValue.textContent = userInfo.about;
    this._avatarValue.src = userInfo.avatar;
  }
}