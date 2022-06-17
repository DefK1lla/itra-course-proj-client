import { makeAutoObservable } from 'mobx';
import { Mode, Locale } from '../utils/storage';

class SettingsState {
    constructor() {
        this._locale = Locale.get('locale') || 'en';
        this._mode = Mode.get() || 'light';

        makeAutoObservable(this);
    }

    setLocale = (locale) => {
        this._locale = locale;
        Locale.set(this._locale);
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
}

export default new SettingsState();