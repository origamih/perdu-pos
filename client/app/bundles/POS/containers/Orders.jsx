// Create this container so that OrderWidget will be able to hot-reload

import OrdersWidget from '../components/OrdersWidget';
import React, { Component, PropTypes } from 'react';

export class Orders extends Component {
  static propTypes = { params: PropTypes.object.isRequired }
  render() {
    return (
      <OrdersWidget params={this.props.params}></OrdersWidget>
    );
  }
}

export default Orders;