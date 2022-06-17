import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Feed from '../pages/Feed';
import Login from '../pages/Login';
import Registration from '../pages/Registration';

function AppRouter() {
    return (
        <Routes>
            <Route exact path='/' element={<Feed />} />
            <Route exact path='/signin' element={<Login />} />
            <Route exact path='/signup' element={<Registration />} />
        </Routes>
    );
}

export default AppRouter;