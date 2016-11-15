import React, { PropTypes } from 'react'
import OrderItemWidget from './OrderItemWidget'

const OrderItemsWidget = ({ orderItems }) => {
  let orders = orderItems.map(orderItem => {
    return <OrderItemWidget orderItem={orderItem} key={orderItem.id}></OrderItemWidget>
  });
  return <tbody>{orders}</tbody>;
}
OrderItemsWidget.propTypes = { orderItems: PropTypes.array.isRequired }
export default OrderItemsWidget