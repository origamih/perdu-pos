import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import posApp from '../reducers/index';
import { routerMiddleware } from 'react-router-redux'
import { hashHistory } from 'react-router';

export default function configureStore(){
  // Using dev Tool
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // using router middleware
  const router = routerMiddleware(hashHistory);

  const store = createStore(posApp, composeEnhancers(applyMiddleware(thunk, router)));

  // Store
  // let store = createStore(posApp, applyMiddleware(thunkMiddleware));

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept( '../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
