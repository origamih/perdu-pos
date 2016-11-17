import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import posApp from '../reducers/index';

export default function configureStore(){
  // Using dev Tool
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(posApp, composeEnhancers(applyMiddleware(thunkMiddleware)));

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
