import React, { PropTypes } from 'react'

const OrderItemsWidget = ({ orderItems }) => {
  return (
    <tbody>
      {
        orderItems.map((orderItem, id) => {
          return (
            <tr key={id}>
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
        })
      }
    </tbody>
  );
}
OrderItemsWidget.propTypes = { orderItems: PropTypes.array.isRequired }
export default OrderItemsWidget