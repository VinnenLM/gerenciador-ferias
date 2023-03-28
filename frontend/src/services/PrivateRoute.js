import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { IsAuth } from './IsAuth';

export const PrivateRoute = () => {
    return IsAuth() ? <Outlet /> : <Navigate to="/" />;
}