import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import UserState from '../store/UserState';

const WithAuth = observer(({ children }) => {
   if (!UserState.isAuth) {
      return <Navigate to='/signin' />;
   }

   return children;
});

export default WithAuth;
