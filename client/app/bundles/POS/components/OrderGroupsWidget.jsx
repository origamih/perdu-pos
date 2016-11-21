import React, { PropTypes } from 'react'
import OrderItemsWidget from '../components/OrderItemsWidget'

const OrderGroupsWidget = ({ orderGroups }) => {
  return (
    <div>
      <table className="table">
        {orderGroups.map(orderGroup => {
          return (
            <OrderItemsWidget 
              orderItems={orderGroup.orderItems} 
              user={orderGroup.user} 
              key={orderGroup.id}
              createdAt={orderGroup.created_at}
              isNew={orderGroup.is_new}>
            </OrderItemsWidget>
          );
        })}
      </table>
    </div>
  );
}
OrderGroupsWidget.propTypes = { orderGroups: PropTypes.array.isRequired }
export default OrderGroupsWidget