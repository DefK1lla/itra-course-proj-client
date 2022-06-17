import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Feed from '../pages/Feed';

function AppRouter() {
    return (
        <Routes>
            <Route exact path='/' element={<Feed />} />
        </Routes>
    );
}

export default AppRouter;