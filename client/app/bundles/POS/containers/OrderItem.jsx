import React from 'react';
import OrderItemWidget from '../components/OrderItemWidget'
import { orderItemClick } from '../middleware/buttonClickHandlers'
import { connect } from 'react-redux'

function mapStateToProps(state, ownProps) {
  const orderItem = state.entities.orderItems[ownProps.orderItemId];
  const menuItem = state.entities.menuItems[orderItem.menu_item];
  const quantity = orderItem.quantity;
  return {
    orderItem,
    menuItem,
    quantity,
    isNew: ownProps.isNew,
    clickedOrders: state.clickedOrders
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onClick: () => {dispatch(orderItemClick(ownProps.orderItem))}
  }
}

const OrderItem = connect(mapStateToProps, mapDispatchToProps)(OrderItemWidget);
export default OrderItem