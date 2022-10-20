import { AxiosError, AxiosRequestConfig } from 'axios';
import useSWR, { KeyedMutator, Middleware, SWRConfiguration, SWRHook } from 'swr';
import { isFunction } from '../utils/helper';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

type SwrOptions = {
	onError?: () => void;
	axiosConfig?:  AxiosRequestConfig<any> | undefined,
	swrConfig?: SWRConfiguration
}
type SwrKeyType = string | (string | number | undefined)[];
type SwrKeyResultType<SendData> = string | [string, SendData] | null;


const useSWRPrivate = <Data, SendData = unknown>(keys: SwrKeyType, sendData?: SendData, {onError, axiosConfig, swrConfig}: SwrOptions = {}) => {
	const axiosPrivate = useAxiosPrivate();
    const token  = useAuth();
	const fetcher = (url: string, data?: SendData) => (axiosPrivate({
			method: 'post',
			url,
			data,
			...axiosConfig
		})
		.then(response => response.data)
		.catch(error => { 
			if(isFunction(onError)) {
				onError();
			}

			throw Error;
		}))

	const getSwrKey = () => {
		if(!token) return null;

		let result: SwrKeyResultType<SendData> = null;
		if(typeof keys === 'string') {
			result = keys;
		}
		if(Array.isArray(keys)) {
			const hasValue = keys.every(val => val !== undefined && val !== null)
			result = hasValue ? keys.join('/') : null;
		}
		if(!!sendData && !!result) {
			result = [result, sendData];

			return result;
		}
	}

    return useSWR(getSwrKey(), fetcher, swrConfig);
}

const swrConfig: SWRConfiguration = {
	revalidateOnFocus: false ,
	revalidateOnReconnect: false,
	shouldRetryOnError: false
}

export { swrConfig }
export default useSWRPrivate;


// const swrMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
// 	const token  = useAuth();
// 	axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${token}`

// 	return useSWRNext(key, fetcher, config)
// }

// Config 說明
// const swrConfig: SWRConfiguration = {
// 	revalidateOnFocus: false , 
// 	suspense 開啟的話，有 error 就一定要搭配 error boundary 來 cache error，否則會報錯
// 	react 的 suspense 可以在元件 render 前先等待，目前 Suspense 仍然只支援搭配 React.lazy 來做到 dynamic loading 元件，在元件還沒真的 render 完成的元件來顯示載入的效果
// 	suspense: true, 

// 	dedupingInterval 再次進到頁面間個幾秒以內不在重複呼叫 api 2000
// 	dedupingInterval: 10000,

// 	是否啟動自動驗證功能
// 	revalidateOnMount: false,
// 	onSuccess: () => {
// 		console.log('success')
// 	},
// 	onError: (error: AxiosError) => {
// 		console.log('swr',error)
// 		if(error.response) {
// 			console.log('error-response', error.response)
// 			console.log('error-request', error.request)
// 		}
// 	},
// 	use: [swrMiddleware]
// }