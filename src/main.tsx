
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Middleware, SWRConfig, SWRConfiguration, SWRHook } from 'swr';
import App from './App';
import { AuthProvider } from './context/AuthProvider';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const swrMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config) => {
	console.log('SWR middleware do something')
	return useSWRNext(key, fetcher, config)
}

const config: SWRConfiguration = {
	revalidateOnFocus: false , 
	// suspense 開啟的話，有 error 就一定要搭配 error boundary 來 cache error，否則會報錯
	// react 的 suspense 可以在元件 render 前先等待，目前 Suspense 仍然只支援搭配 React.lazy 來做到 dynamic loading 元件，在元件還沒真的 render 完成的元件來顯示載入的效果
	// suspense: true, 

	// dedupingInterval 再次進到頁面間個幾秒以內不在重複呼叫 api 2000
	// dedupingInterval: 10000,

	// 是否啟動自動驗證功能
	// revalidateOnMount: false,
	onSuccess: () => {
		console.log('success')
	},
	onError: () => {
		console.log('no data')
	},
	use: [swrMiddleware]
}


root.render(
	<BrowserRouter>
		<SWRConfig value={config}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</SWRConfig>
	</BrowserRouter>
);
