import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { IntlProvider } from 'react-intl';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import SettingsState from './store/SettingsState';
import Header from './components/layout/Header';
import AppRouter from './components/AppRouter';
import enMessages from './localization/en.json';
import ruMessages from './localization/ru.json';

const App = observer(() => {
  const theme = createTheme({
    palette: {
      mode: SettingsState.mode
    },
  });

  const messages = {
    'ru': ruMessages,
    'en': enMessages,
  };

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
          <Header />
          <AppRouter />
        </BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
});

export default App;
