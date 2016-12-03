import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import ReactOnRails from 'react-on-rails';
import React from 'react';
import { Provider } from 'react-redux';
import POSIndex from '../containers/POSIndex';
import POSHomeWidget from '../components/POSHomeWidget';
import AllTables from '../containers/AllTables';
import Tickets from '../containers/Tickets';
import configureStore from './configureStore';
import Orders from '../containers/Orders'
import { syncHistoryWithStore } from 'react-router-redux'
// Import at least once style so that webpack will render an output css
import style from './POSRouter';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
class POSRouter extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" user={this.props.user} component={POSIndex}>
            <IndexRedirect to="/home"></IndexRedirect>
            <Route path="home" component={POSHomeWidget}>
              <IndexRedirect to="/home/all_tables"></IndexRedirect>
              <Route path="all_tables" component={AllTables} shouldRedirect={true}></Route>
              <Route path="customer_search" ></Route>
              <Route path="customer_tickets" ></Route>
              <Route path="all_tickets" ></Route>
            </Route>
            <Route path="/all_tables/:table_id" component={Tickets}></Route>
            <Route path="/all_tables/:table_id/:ticket_id" component={Orders}></Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactOnRails.register({ POSRouter });