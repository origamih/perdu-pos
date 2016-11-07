import { Link } from 'react-router';
import React from 'react';

const POSHomeWidget = () => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li><Link to='/home/all_tables' activeClassName="active">All Tables</Link></li>
        <li><Link to='/home/customer_search' activeClassName="active">Customer Search</Link></li>
        <li><Link to='/home/customer_tickets' activeClassName="active">Customer Tickets</Link></li>
        <li><Link to='/home/all_tickets' activeClassName="active">All Tickets</Link></li>
      </ul>
      <div className="tab-content">
        {this.props.children}
      </div>
    </div>
  );
}
export default POSHomeWidget