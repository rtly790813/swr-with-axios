import React from 'react';
import { Outlet } from "react-router-dom";

const Home = React.lazy(() => import('./pages/index'));
const Login = React.lazy(() => import('./pages/Login'));

export const routes = [
    { path: '', element: <Home />, index: true},
    { path: 'login', element: <Login />, },
];

