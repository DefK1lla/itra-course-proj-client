import React from 'react';
import { Route, Routes } from 'react-router-dom';

import WithAuth from '../hoc/WithAuth';
import WithoutAuth from '../hoc/WithoutAuth';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

function AppRouter() {
    return (
        <Routes>
            <Route exact path='/' element={<Feed />} />
            <Route exact path='/signin' element={
                <WithoutAuth>
                    <Login />
                </WithoutAuth>
            } />
            <Route exact path='/signup' element={
                <WithoutAuth>
                    <Registration />
                </WithoutAuth>
            } />
            <Route path='*' element={<Feed />} />
        </Routes>
    );
}

export default AppRouter;