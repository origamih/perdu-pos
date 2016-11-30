import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import OrdersWidget from '../components/OrdersWidget'
import { submitButtonClick } from '../middleware/submitButtonHandler'
import * as api from '../middleware/api'

export class Orders extends React.Component {
  componentDidMount() {
    const { ticket_id, table_id, customer_id, dispatch } = this.props;
    dispatch(api.fetchCurrentTicket(ticket_id));
    dispatch(api.fetchCurrentTable(table_id));
    dispatch(api.fetchCurrentCustomer(customer_id));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ticket_id !== this.props.ticket_id) {
      this.props.dispatch(api.fetchCurrentTicket(nextProps.ticket_id));
    }
  }
  render() {
    const { currentTicket, dispatch, currentTable, currentCustomer, receiveTickets } = this.props;
    return (
      <div>
        {!receiveTickets && <h2></h2>}
        {receiveTickets && <OrdersWidget 
          submitButtonClick={(ticketId, tableId, customerId) => {
            dispatch(submitButtonClick(ticketId, tableId, customerId))
          }}
          currentTicket={currentTicket}
          currentTable={currentTable}
          currentCustomer={currentCustomer}>
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
    receiveTickets: state.receiveTickets,
    currentTable: state.currentTable,
    currentCustomer: state.currentCustomer
  }
}

export default connect(mapStateToProps)(Orders)