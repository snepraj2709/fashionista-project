import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import { makeServer } from './server';
import { BrowserRouter } from 'react-router-dom';
import { ProductContext, ProductProvider } from './context/ProductContext';
import { AuthContext, AuthProvider } from './context/authContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

export { ProductContext, AuthContext };
// Call make Server
makeServer();

root.render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ProductProvider>
					<App />
				</ProductProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
