import React, { Component } from 'react';
import SettleWidget from '../components/SettleWidget'
import { fetchCurrentTable, fetchPayment } from '../middleware/api'
import { calculateBalance, submitClick } from '../middleware/payment'
import { connect } from 'react-redux'
import { getPayment, getBalance } from '../actions/index'

export class Settle extends Component {
  componentDidMount() {
    const { dispatch, params } = this.props;
    const { table_id, ticket_id } = params;
    dispatch(fetchCurrentTable(table_id));
    calculateBalance(ticket_id).then(balance => dispatch(getBalance(balance)));
    dispatch(fetchPayment(ticket_id));
  }
  render() {
    const { balance, ticket_id, currentTable, payment, dispatch } = this.props;
    const updatePayment = payment => dispatch(getPayment(payment));
    return (
      <SettleWidget
        submitClick={(payment, ticket_id, totalBalance) => dispatch(submitClick(payment, ticket_id, totalBalance))}
        updatePayment={updatePayment}
        ticket_id={ticket_id}
        currentTable={currentTable}
        payment={payment}
        balance={balance}>
      </SettleWidget>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { table_id, ticket_id } = ownProps.params;
  return {
    balance: state.balance,
    table_id,
    ticket_id,
    currentTable: state.currentTable,
    payment: state.payment
  }
}

export default connect(mapStateToProps)(Settle);