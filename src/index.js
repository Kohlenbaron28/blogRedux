import React from 'react';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { reducer } from './store/reducer';
import App from './components/App/App';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

function loggerMiddleware(store) {
  return function (next) {
    return function (action) {
      const result = next(action);
      console.log('middleware', store.getState());
      return result;
    };
  };
}

const store = createStore(reducer, composeEnhancers(applyMiddleware(loggerMiddleware, thunk)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
