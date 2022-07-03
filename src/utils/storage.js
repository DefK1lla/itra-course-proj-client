const LOCALE = 'LOCALE';
const MODE = 'MODE';
const TOKEN = 'TOKEN';

const Mode = {
   get() {
      return localStorage.getItem(MODE);
   },

   set(mode) {
      localStorage.setItem(MODE, mode);
   }
};

const Locale = {
   get() {
      return localStorage.getItem(LOCALE);
   },

   set(locale) {
      localStorage.setItem(LOCALE, locale);
   }
};

const Token = {
   get() {
      return localStorage.getItem(TOKEN);
   },

   remove() {
      localStorage.removeItem(TOKEN);
   },

   set(token) {
      localStorage.setItem(TOKEN, 'Bearer ' + token);
   }
};

export { Mode, Locale, Token };