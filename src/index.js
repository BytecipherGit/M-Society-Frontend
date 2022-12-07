import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { configureStore } from '@reduxjs/toolkit';
import reportWebVitals from './reportWebVitals';
import persistStore from 'redux-persist/es/persistStore';
import './static/css/bootstrap.min.css';
import './static/css/font-awesome.min.css';
import './static/css/login-css.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({ reducer: rootReducer, middleware: [thunk] });
const persistor = persistStore(store);

root.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
