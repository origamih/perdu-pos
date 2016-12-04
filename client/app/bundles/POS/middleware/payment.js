import * as api from './api'
import { getBalance } from '../actions/index'
import { push } from 'react-router-redux'

export const calculateBalance = ticketId => {
  return (dispatch) => {
    api.getOrderGroups(ticketId)
    .then(response => {
      const allOrderItems = Object.values(response.entities.orderItems);
      const orderItems = allOrderItems.filter(item => {
        return !item.is_void && !item.is_gift
      });
      let balance = 0;
      orderItems.forEach(item => {
        balance += item.quantity * response.entities.menuItems[item.menu_item].price;
      });
      dispatch(getBalance(balance));
    });
  }
}

function updatePayment(payment, ticket_id, totalBalance) {
  if(!payment.id) {
    return api.createPayment({ ...payment, ticket_id, total: totalBalance });
  }
  else {
    return api.updatePayment(payment);
  }
}

export const submitClick = (payment, ticket_id, totalBalance) => {
  return dispatch => {
    if(totalBalance > 0) {
      updatePayment(payment, ticket_id, totalBalance)
      .then(() => dispatch(push('/home/all_tables')));
    }
    else {
      const ticket = {
        id: ticket_id,
        is_open: false
      };
      updatePayment(payment, ticket_id, totalBalance)
      .then(api.updateTicket(ticket))
      .then(() => dispatch(push('/home/all_tables')))
    }
  }
}