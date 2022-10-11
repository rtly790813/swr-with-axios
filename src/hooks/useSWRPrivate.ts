import { AxiosError } from 'axios';
import useSWR, { KeyedMutator, Middleware, SWRConfiguration, SWRHook } from 'swr';
import useAuth from './useAuth';
import useAxiosPrivate from './useAxiosPrivate';

type SwrResultType<Data>= {
	data: Data,
	error: AxiosError,
	mutate: KeyedMutator<any>,
	loading: boolean
}

const useSWRPrivate = <Data extends {}>(key: string, errorFn: () => void):SwrResultType<Data> => {
	const axiosPrivate = useAxiosPrivate();
    const token  = useAuth();
	const fetcher = (path: string) => (axiosPrivate
		.get(path)
		.then(response => response.data)
		.catch(error => { 
			errorFn()
			throw Error 
		}))

    const { data, error, mutate } = useSWR(token ? [key, token] : null, fetcher);
    return {
        data,
        error,
        mutate,
        loading: !data && !error
    } 
}

const swrConfig: SWRConfiguration = {
	revalidateOnFocus: false ,
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