import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchOpenedTicket, fetchOrderGroup, fetchOrderItems } from '../actions/index'
import OrderItemsWidget from '../components/OrderItemsWidget'

export class OrderItems extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    orderItems: PropTypes.object.isRequired,
    tableId: PropTypes.string.isRequired,
    customerId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired
  }
  componentDidMount() {
    const { dispatch, tableId, customerId, userId } = this.props; 
    dispatch(fetchOpenedTicket(tableId, customerId))
    .then(action => dispatch(fetchOrderGroup(action.ticket.id, userId)))
    .then(action => dispatch(fetchOrderItems(action.orderGroup.id)));
  }
  render() {
    return (
      <OrderItemsWidget orderItems={this.props.orderItems}></OrderItemsWidget>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    orderItems: state.orderItems,
    tableId: ownProps.tableId,
    customerId: ownProps.customerId,
    userId: ownProps.userId
  }
}

export default connect(mapStateToProps)(OrderItems)