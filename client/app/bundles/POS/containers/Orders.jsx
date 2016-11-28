import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import OrdersWidget from '../components/OrdersWidget'
import { submitButtonClick } from '../middleware/submitButtonHandler'

function mapStateToProps(state, ownProps) {
  const { ticket_id, table_id, customer_id } = ownProps.params;
  return { ticket_id, table_id, customer_id }
}

function mapDispatchToProps(dispatch) {
  return { 
    submitButtonClick: (ticketId, tableId, customerId) => {
      dispatch(submitButtonClick(ticketId, tableId, customerId))
    }
  }
}
const Orders = connect(mapStateToProps, mapDispatchToProps)(OrdersWidget);
export default Orders