import React from 'react';

import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import UserState from '../store/UserState';

const WithoutAuth = observer(({ children }) => {
   if (UserState.isAuth) {
      return <Navigate to='/' />;
   }  

   return children;
});

export default WithoutAuth;
