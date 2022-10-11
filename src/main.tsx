
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { Middleware, SWRConfig, SWRConfiguration, SWRHook } from 'swr';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { swrConfig } from './hooks/useSWRPrivate';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<BrowserRouter>
		<SWRConfig value={swrConfig}>
			<AuthProvider>
				<App />
			</AuthProvider>
		</SWRConfig>
	</BrowserRouter>
);
