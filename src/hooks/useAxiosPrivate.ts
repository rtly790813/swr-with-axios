import { AxiosError } from 'axios';
import React, { useLayoutEffect } from 'react';
import { axiosPrivate } from '../utils/axios';
import useAuth from './useAuth';

// 第二種方式
// useAxiosPrivate 第一次 render 會抓不到 token，因為 useEffect 執行順序問題，因此改用 useLayoutEffect
const useAxiosPrivate = () => {
    const token = useAuth()

    useLayoutEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(config => {
            if(!config.headers?.Authorization && token) {
                config.headers = {
                    Authorization: `Bearer ${token}`
                }
            }
            return config;
        });

		const responseIntercept = axiosPrivate.interceptors.response.use(
			response => response, 
			(error: AxiosError) => {
			if(error.response) {
				console.log('error-response', error.response)
				console.log('error-request', error.request)
			}

			return Promise.reject(error)
		})

		// Remove interceptors
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [token])   
    
    return axiosPrivate
}

export default useAxiosPrivate
