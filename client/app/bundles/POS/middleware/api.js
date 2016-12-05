import * as actions from '../actions/index'
import { normalize, Schema, arrayOf } from 'normalizr';
import { calculateBalance } from './payment'

export const orderGroupSchema = new Schema('orderGroups');
const orderSchema = new Schema('orderItems');
const menuItemSchema = new Schema('menuItems');
const userSchema = new Schema('users');
const ticketSchema = new Schema('ticket');

orderGroupSchema.define({
  orders: arrayOf(orderSchema),
  ticket: ticketSchema,
  user: userSchema
});

orderSchema.define({
  menu_item: menuItemSchema
});

/* ===========================================================
  thunks
=============================================================*/

function getHeaders() {
  let token = global.$ ? $('meta[name="csrf-token"]').attr('content') : '';
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  return headers
}

function fetchParams(method) {
  return {
    method: method,
    headers: getHeaders(),
    credentials: 'same-origin'
  }
}

export const fetchTables = function(testURL = '') {
  return dispatch => {
    return fetch(testURL + '/tables.json')
    .then(response => response.json())
    .then(json => dispatch(actions.getTables(json)))
    .catch(err => console.log(err));
  }
}

export const fetchMenuCategories = function(testURL = '') {
  return dispatch => {
    return fetch(testURL + '/menu_categories.json')
    .then(response => response.json())
    .then(json => dispatch(actions.getMenuCategories(json)))
    .catch(err => console.log(err));
  }
}

export const fetchMenuItems = function(id, testURL = '') {
  return dispatch => {
    return fetch(testURL + '/menu_items/show_by_category', { 
      ...fetchParams('POST'),
      body: JSON.stringify({ menu_item: { menu_category_id: id } })
    })
    .then(response => response.json())
    .then(json => dispatch(actions.getMenuItems(json)));
    // .catch(err => console.log(err));
  }
}

export const fetchOpenedTicket = function(tableId, customerId, testURL = '') {
  return dispatch => {
    return fetch(testURL + '/tickets/show_by_params', {
      ...fetchParams('POST'),
      body: JSON.stringify({ ticket: { table_id: tableId, customer_id: customerId, is_open: true } })
    })
    .then(response => response.json())
    .then(json => {
      return dispatch(actions.getOpenedTicket(json));
    });
  }
}

export const fetchOrderGroups = function(ticketId, testURL = '') {
  return dispatch => {
    return fetch(testURL + '/order_groups/show_by_params', {
      ...fetchParams('POST'),
      body: JSON.stringify({ order_group: { ticket_id: ticketId || null } })
    })
    .then(response => response.json())
    .then(json => { 
      const normalized = normalize(json, arrayOf(orderGroupSchema));
      return dispatch(actions.getOrderGroups(normalized))
    });
    // .catch(err => console.log(err));
  }
}

export const fetchCreateOrderGroup = function(orderGroup, testURL = '') {
  return fetch(testURL + '/order_groups.json', {
    ...fetchParams('POST'),
    body: JSON.stringify({ order_group: orderGroup })
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

export const fetchCreateOrderItem = function(orderItem, testURL = '') {
  return fetch(testURL + '/orders.json', {
    ...fetchParams('POST'),
    body: JSON.stringify({ order: orderItem })
  })
  .then(response => response.json());
}

export const createTicket = (ticket, testURL = '') => {
  return fetch(testURL + '/tickets.json', {
    ...fetchParams('POST'),
    body: JSON.stringify({ ticket })
  })
  .then(response => response.json());
}

export const updateOrderItem = (orderItem, testURL = '') => {
  return dispatch => {
    return fetch(testURL + `/orders/${orderItem.id}.json`, {
      ...fetchParams('PUT'),
      body: JSON.stringify({ order: orderItem })
    })
    .then(response => response.json())
    .then(() => dispatch(actions.updateOrderItem(orderItem)));
  }
}

export const getTicket = (ticketId, testURL = '') => {
  return fetch(testURL + `/tickets/${ticketId}.json`)
  .then(response => response.json());
}

export const fetchCurrentTicket = (ticketId, testURL = '') => {
  return dispatch => {
    dispatch(actions.requestTickets());
    if(ticketId == 0) {
      dispatch(actions.getCurrentTicket({}));
      dispatch(actions.receiveTickets());
      return
    }
    return getTicket(ticketId)
    .then(json => {
      dispatch(actions.getCurrentTicket(json));
      dispatch(actions.receiveTickets());
    });
  }
}

export const fetchCurrentTable = (tableId, testURL = '') => {
  return dispatch => {
    if(!tableId) {
      return dispatch(actions.getCurrentTable({}))
    }
    return fetch(testURL + `/tables/${tableId}.json`)
    .then(response => response.json())
    .then(json => {
      dispatch(actions.getCurrentTable(json));
    });
  }
}

export const fetchCurrentCustomer = (customerId, testURL = '') => {
  return dispatch => {
    if(!customerId) {
      return dispatch(actions.getCurrentCustomer({}))
    }
    return fetch(testURL + `/customers/${customerId}.json`)
    .then(response => response.json())
    .then(json => {
      dispatch(actions.getCurrentCustomer(json));
    });
  }
}

export const deleteOrderGroup = (orderGroup, testURL = '') => {
  return fetch(testURL + `/order_groups/${orderGroup.id}.json`, {
    ...fetchParams('DELETE')
  });
}

export const updateOrderGroup = (orderGroup, testURL = '') => {
  return fetch(`${testURL}/order_groups/${orderGroup.id}.json`, {
    ...fetchParams('PUT'),
    body: JSON.stringify({ order_group: orderGroup })
  })
  .then(response => response.json);
}

export const deleteTicket = (ticket, testURL = '') => {
  return fetch(`${testURL}/tickets/${ticket.id}.json`, {
    ...fetchParams('DELETE')
  });
}

export const getOrderGroups = function(ticketId, testURL = '') {
  return fetch(testURL + '/order_groups/show_by_params', {
    ...fetchParams('POST'),
    body: JSON.stringify({ order_group: { ticket_id: ticketId || null } })
  })
  .then(response => response.json())
  .then(json => { 
    return normalize(json, arrayOf(orderGroupSchema));
  });
}

export const updateTicket = (ticket, testURL = '') => {
  return fetch(`${testURL}/tickets/${ticket.id}.json`, {
    ...fetchParams('PUT'),
    body: JSON.stringify({ ticket: ticket })
  })
  .then(response => response.json());
}

export const fetchPayment = (ticketId, testURL = '') => {
  return dispatch => {
    return fetch(`${testURL}/payments/show_by_params`, {
      ...fetchParams('POST'),
      body: JSON.stringify({ payment: { ticket_id: ticketId } })
    })
    .then(response => response.json())
    .then(json => dispatch(actions.getPayment(json)));
  }
}

export const updatePayment = (payment, testURL = '') => {
  return fetch(`${testURL}/payments/${payment.id}.json`, {
    ...fetchParams('PUT'),
    body: JSON.stringify({ payment })
  })
  .then(response => response.json());
}

export const createPayment = (payment, testURL = '') => {
  return fetch(`${testURL}/payments.json`, {
    ...fetchParams('POST'),
    body: JSON.stringify({ payment })
  })
  .then(response => response.json());
}

function addBalanceToTicket(tickets) {
  return tickets.map(ticket => {
    return calculateBalance(ticket.id)
    .then(balance => { return { ...ticket, balance } })
  });
}

export const getTicketsByParams = (params, testURL = '') => {
  return fetch(`${testURL}/tickets/show_by_date`, {
    ...fetchParams('POST'),
    body: JSON.stringify({ ticket: { ...params } })
  })
  .then(response => response.json())
  .then(tickets => Promise.all(addBalanceToTicket(tickets)));
}