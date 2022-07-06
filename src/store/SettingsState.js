import { makeAutoObservable } from 'mobx';
import { Mode, Locale } from '../utils/storage';

class SettingsState {
   constructor() {
      this._locale = Locale.get('locale') || 'en';
      this._mode = Mode.get() || 'light';

      document.documentElement.setAttribute('lang', this._locale);

      makeAutoObservable(this);
   }

   setLocale = (locale) => {
      this._locale = locale;
      Locale.set(this._locale);

      document.documentElement.setAttribute('lang', this._locale);
   };

   setMode = (mode) => {
      this._mode = mode;
      Mode.set(this._mode);
   };

   get mode() {
      return this._mode;
   }

   get locale() {
      return this._locale;
   }

   get theme() {
      return this._theme;
   }
}

export default new SettingsState();