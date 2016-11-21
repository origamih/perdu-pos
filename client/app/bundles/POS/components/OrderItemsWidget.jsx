import React, { PropTypes } from 'react'
import style from './OrderItemsWidget.scss'
import OrderItem from '../containers/OrderItem'

const OrderItemsWidget = ({ orderItems, user, createdAt, isNew }) => {
  return (
    <tbody>
      {
        !isNew &&
          <tr>
            <td>
              <span className={style.createdBy}>
                Created by {user.email} at {createdAt}
              </span>
            </td>
          </tr>
      }
      {
        orderItems.map((orderItem, id) => {
          return <OrderItem orderItem={orderItem} isNew={isNew} key={id}></OrderItem>
        })
      }      
    </tbody>
  );
}
OrderItemsWidget.propTypes = { orderItems: PropTypes.array.isRequired }
export default OrderItemsWidget