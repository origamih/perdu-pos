import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchOrderItems } from '../actions/index'
import OrderItemsWidget from '../components/OrderItemsWidget'

export class OrderItems extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    orderGroup: PropTypes.object.isRequired
  }
  componentDidMount() {
    const { dispatch, orderGroup } = this.props; 
    dispatch(fetchOrderItems(orderGroup));
  }
  render() {
    const { orderItems } = this.props;
    return (
      <OrderItemsWidget orderItems={orderItems}></OrderItemsWidget>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    orderGroup: ownProps.orderGroup,
    orderItems: state.orderItems,
    user: state.user
  }
}

export default connect(mapStateToProps)(OrderItems)