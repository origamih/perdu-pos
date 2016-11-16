import React, { PropTypes } from 'react'
import OrderItemsWidget from '../components/OrderItemsWidget'

const OrderGroupsWidget = ({ orderGroups }) => {
  return (
    <div>
      <table className="table table-hover">
        {orderGroups.map(orderGroup => {
          return <OrderItemsWidget orderItems={orderGroup.orderItems} key={orderGroup.id}></OrderItemsWidget>
        })}
      </table>
    </div>
  );
}
OrderGroupsWidget.propTypes = { orderGroups: PropTypes.array.isRequired }
export default OrderGroupsWidget