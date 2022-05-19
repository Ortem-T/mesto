export default class UserInfo {
    constructor({profileName, profileAboutMe}) {
        this._nameValue = document.querySelector(profileName);
        this._aboutMeValue = document.querySelector(profileAboutMe);
    }

    getUserInfo() {
        const userInfo = {}
        
        userInfo.name = this._nameValue.textContent;
        userInfo.aboutMe = this._aboutMeValue.textContent;
        
        return userInfo;
      }
    
    setUserInfo(userInfo) {
        this._nameValue.textContent = userInfo.name;
        this._aboutMeValue.textContent = userInfo.aboutme;
      }
}