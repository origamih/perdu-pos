import React, { Component, PropTypes } from 'react';
import OrderItemWidget from '../components/OrderItemWidget'
import { orderItemClick } from '../middleware/index'
import { connect } from 'react-redux'

function mapStateToProps(state, ownProps) {
  return {
    orderItem: ownProps.orderItem,
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
OrderItem.propTypes = { orderItem: PropTypes.object.isRequired }
export default OrderItem