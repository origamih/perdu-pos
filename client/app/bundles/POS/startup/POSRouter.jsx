import { Router, Route, IndexRedirect, hashHistory } from 'react-router';
import ReactOnRails from 'react-on-rails';
import React from 'react';
import POSIndexWidget from '../components/POSIndexWidget';
import POSHomeWidget from '../components/POSHomeWidget';
import AllTables from '../containers/AllTables'

class POSRouter extends React.Component {
  render() {
    return (
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
    );
  }
}

ReactOnRails.register({ POSRouter });