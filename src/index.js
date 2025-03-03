<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './components/app/app';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './services/store';

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(
	<Provider store={store}>
		<App />
	</Provider>,
);
>>>>>>> 453cb58 (feat: выполнил задание второго спринта)
