import React, { useEffect, useLayoutEffect } from 'react';
import useSWR from 'swr';
import { axiosPrivate } from '../utils/axios';
import useAuth from './useAuth';

const get = (path: string, token: string) => (axiosPrivate
    .get(path, {headers: {Authorization: "Bearer " + token }})
    .then(res => res.data)
    .catch(error => { throw error }))

// const useSWRPrivate = (key: string) => {
//     const token  = useAuth();
//     console.log('useSWRPrivate start')
//     const { data, error, mutate } = useSWR(token ? [key, token] : null, get);
//     console.log('useSWRPrivate end')

//     return {
//         data,
//         error,
//         mutate,
//         loading: !data && !error
//     }

// }
// export default useSWRPrivate;

// useAxiosPrivate 第一次 render 會抓不到 token，因為 useEffect 執行順序問題
const useAxiosPrivate = () => {
    const token = useAuth()

    useLayoutEffect(() => {
        console.log('useEffect useAxiosPrivate start')
        const requestIntercept = axiosPrivate.interceptors.request.use(config => {
            console.log('intercept',!config.headers?.Authorization && token)
            if(!config.headers?.Authorization && token) {
                config.headers = {
                    Authorization: `Bearer ${token}`
                }
            }
            return config;
        });
        console.log('useEffect useAxiosPrivate end')

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
        }

    }, [token])   
    
    console.log('useAxiosPrivate return')
    return axiosPrivate

}

export default useAxiosPrivate