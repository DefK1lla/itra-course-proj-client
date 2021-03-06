import { makeAutoObservable } from 'mobx';

import { Token } from '../utils/storage';

class UserState {
   _userData = null;
   _isAuth = null;

   constructor() {
      makeAutoObservable(this);
   }

   login = (userData) => {
      this._userData = userData;
      this._isAuth = true;
   }

   logout = () => {
      this._userData = null;
      this._isAuth = false;

      Token.remove();
   }

   get userData() {
      return this._userData;
   }

   get isAuth() {
      return this._isAuth;
   }
}

export default new UserState();
