import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import ReactOnRails from 'react-on-rails';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import POSIndexWidget from '../components/POSIndexWidget';
import POSHomeWidget from '../components/POSHomeWidget';
import AllTables from '../containers/AllTables';
import posApp from '../reducers/index'
import style from './POSRouter' 

// Import at least once style so that webpack will render an output css

// Store
let store = createStore(posApp, applyMiddleware(thunkMiddleware));

// Enable Webpack hot module replacement for reducers
if (module.hot) {
  module.hot.accept( '../reducers', () => {
    store.replaceReducer(posApp);
  });
}


class POSRouter extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <Router history={hashHistory}>
          <Route path="/" component={POSIndexWidget}>
            <IndexRedirect to="/home"></IndexRedirect>
            <Route path="home" component={POSHomeWidget}>
              <IndexRedirect to="/home/all_tables"></IndexRedirect>
              <Route path="all_tables" component={AllTables}></Route>
              <Route path="customer_search" ></Route>
              <Route path="customer_tickets" ></Route>
              <Route path="all_tickets" ></Route>
            </Route>
            <Route path="/all_tables/:table_id" ></Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactOnRails.register({ POSRouter });