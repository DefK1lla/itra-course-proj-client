import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { IntlProvider } from 'react-intl';

import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ruRU, enUS } from '@mui/material/locale';
import { ruRU as DataGridRu, enUS as DataGridEn } from '@mui/x-data-grid';

import SettingsState from './store/SettingsState';
import UserState from './store/UserState';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AppRouter from './components/AppRouter';
import Loading from './components/Loading';

import authApi from './http/authAPI';

import enMessages from './localization/en.json';
import ruMessages from './localization/ru.json';

const App = observer(() => {
   const muiLocale = SettingsState.locale === 'ru' ? ruRU : enUS;
   const DataGridLocale = SettingsState.locale === 'ru' ? DataGridRu : DataGridEn;
   const theme = createTheme({
      palette: {
         mode: SettingsState.mode
      },
   }, muiLocale, DataGridLocale);

   const messages = {
      'ru': ruMessages,
      'en': enMessages,
   };

   React.useEffect(() => {
      authApi.check().then(user => UserState.login(user)).catch(e => UserState.logout());
   }, []);

   return (
      <ThemeProvider
         theme={theme}
      >
         <CssBaseline />
         <IntlProvider
            messages={messages[SettingsState.locale]}
            locale={SettingsState.locale}
            defaultLocale='en'
         >
            <BrowserRouter>
               <div
                  style={{
                     minHeight: '100vh',
                     display: 'flex',
                     flexDirection: 'column',
                  }}
               >
                  <Header />
                  <div
                     style={{
                        flexGrow: 1
                     }}
                  >
                     {UserState.isAuth === null ? <Loading /> : <AppRouter />}
                  </div>
                  <Footer />
               </div>
            </BrowserRouter>
         </IntlProvider>
      </ThemeProvider>
   );
});

export default App;
