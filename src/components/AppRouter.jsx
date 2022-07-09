import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WithAuth from '../hoc/WithAuth';
import WithAdminRole from '../hoc/WithAdminRole';
import WithoutAuth from '../hoc/WithoutAuth';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Registration from '../pages/Registration';
import Admin from '../pages/Admin';
import User from '../pages/User';
import CollectionEditor from '../pages/CollectionEditor';
import Collection from '../pages/Collection';
import ItemEditor from '../pages/ItemEditor';



const AppRouter = () => {
   return (
      <Routes>
         <Route exact path='/' element={<Feed />} />
         <Route exact path='/user/:id' element={<User />} />
         <Route exact path='/collection/:id' element={<Collection />} />
         <Route
            exact
            path='/signin'
            element={(
               <WithoutAuth>
                  <Login />
               </WithoutAuth>
            )}
         />
         <Route
            exact
            path='/add-collection'
            element={(
               <WithAuth>
                  <CollectionEditor />
               </WithAuth>
            )}
         />
         <Route
            exact
            path='/collection/:id/edit'
            element={(
               <WithAuth>
                  <CollectionEditor />
               </WithAuth>
            )}
         />
         <Route
            exact
            path='/add-item'
            element={(
               <WithAuth>
                  <ItemEditor />
               </WithAuth>
            )}
         />
         <Route
            exact
            path='/item/:id/edit'
            element={(
               <WithAuth>
                  <ItemEditor />
               </WithAuth>
            )}
         />
         <Route
            exact
            path='/signup'
            element={(
               <WithoutAuth>
                  <Registration />
               </WithoutAuth>
            )}
         />
         <Route
            exact
            path='/admin'
            element={(
               <WithAdminRole>
                  <Admin />
               </WithAdminRole>
            )}
         />
         <Route path='*' element={<Feed />} />
      </Routes>
   );
};

export default AppRouter;
