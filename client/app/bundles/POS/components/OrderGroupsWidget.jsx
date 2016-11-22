import React, { PropTypes } from 'react'
import OrderItem from '../containers/OrderItem'
import style from './OrderGroupsWidget.scss'

const OrderGroupsWidget = ({ orderGroups, users }) => {
  return (
    <div>
      <table className="table">
        {orderGroups.map(orderGroup => {
          return (
            <tbody key={orderGroup.id}>
              {
                !orderGroup.is_new &&
                  <tr>
                    <td>
                      <span className={style.createdBy}>
                        Created by {users[orderGroup.user].email} at {new Date(orderGroup.created_at).toLocaleString()}
                      </span>
                    </td>
                  </tr>
              }
              {
                orderGroup.orders.map((orderItem, id) => {
                  return <OrderItem orderItemId={orderItem} isNew={orderGroup.is_new} key={id}></OrderItem>
                })
              }      
            </tbody>
          );
        })}
      </table>
    </div>
  );
}
OrderGroupsWidget.propTypes = { orderGroups: PropTypes.array.isRequired }
export default OrderGroupsWidget