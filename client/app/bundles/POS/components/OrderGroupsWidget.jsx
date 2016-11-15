import React, { PropTypes } from 'react'
import OrderItems from '../containers/OrderItems'

const OrderGroupsWidget = ({ orderGroups, user }) => {
  let orderGroupList = orderGroups.map(orderGroup => {
    return <OrderItems orderGroup={orderGroup} key={orderGroup.id}></OrderItems>
  });
  return (
    <div>
      <table className="table table-hover">
        {orderGroupList}
      </table>
    </div>
  );
}
OrderGroupsWidget.propTypes = { orderGroups: PropTypes.array.isRequired }
export default OrderGroupsWidget