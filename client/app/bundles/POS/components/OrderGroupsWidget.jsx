import React, { PropTypes } from 'react'
import OrderItems from '../containers/OrderItems'

const OrderGroupsWidget = ({ orderGroups, user }) => {
  return (
    <div>
      <table className="table table-hover">
        {orderGroups.map((orderGroup, id) => {
          return <OrderItems orderGroup={orderGroup} key={id}></OrderItems>
        })}
      </table>
    </div>
  );
}
OrderGroupsWidget.propTypes = { orderGroups: PropTypes.array.isRequired }
export default OrderGroupsWidget