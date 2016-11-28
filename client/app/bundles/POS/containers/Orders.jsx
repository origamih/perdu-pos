import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import OrdersWidget from '../components/OrdersWidget'
import { submitButtonClick } from '../middleware/submitButtonHandler'
import * as api from '../middleware/api'

export class Orders extends React.Component {
  componentDidMount() {
    const { ticket_id, table_id, customer_id, dispatch } = this.props;
    dispatch(api.fetchCurrentTicket(ticket_id));
  }
  render() {
    const { currentTicket, dispatch, table_id, customer_id, receiveTickets } = this.props;
    return (
      <div>
        {!receiveTickets && <h2>Loading...</h2>}
        {receiveTickets && <OrdersWidget 
          submitButtonClick={(ticketId, tableId, customerId) => {
            dispatch(submitButtonClick(ticketId, tableId, customerId))
          }}
          currentTicket={currentTicket}
          table_id={table_id}
          customer_id={customer_id}>
        </OrdersWidget>}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { ticket_id, table_id, customer_id } = ownProps.params;
  return { 
    ticket_id, 
    table_id, 
    customer_id,
    currentTicket: state.currentTicket,
    receiveTickets: state.receiveTickets
  }
}

export default connect(mapStateToProps)(Orders)