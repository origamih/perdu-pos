import React, { PropTypes } from 'react'
const OrderItemWidget = ({ orderItem }) => {
  return (
    <tr>
      <td>
        <a href="#" className="row" >
          <span className="col-xs-1">{orderItem.quantity}</span>
          <span className='col-xs-9'>
            <p className="order-name">{orderItem.menu_item.name}</p>
            <p className="order-status">
              {orderItem.status}
              <span> extraStatus</span>
            </p>
          </span>
          <span className='col-xs-2'>{orderItem.menu_item.price * orderItem.quantity}</span>
        </a>
      </td>
    </tr>
  );
}
OrderItemWidget.propTypes = { orderItem: PropTypes.object.isRequired }
export default OrderItemWidget