import React from 'react'
import { useContextSelector } from 'use-context-selector'
import AuthContext from '../context/AuthProvider';
import axios from '../utils/axios';

const parseJwt = (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );
    return JSON.parse(jsonPayload);
};

const Login = () => {
    const setAuth = useContextSelector( AuthContext, v => v?.[1]);
    const handleLogin = async () => {
        try {
            const { token } = await axios.get('auth').then( res => res.data);
            const user  = { ...parseJwt(token), token}
            if(setAuth) {
                setAuth(user);
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div onClick={handleLogin}>Login</div>
    )
}


export default Login