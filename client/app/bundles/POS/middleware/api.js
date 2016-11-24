import * as actions from '../actions/index'
import { normalize, Schema, arrayOf } from 'normalizr';

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
    .then(json => dispatch(actions.getOpenedTicket(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOrderGroups = function(ticket, testURL = '') {
  const ticketId = ticket ? ticket.id : '';
  return dispatch => {
    return fetch(testURL + '/order_groups/show_by_params', {
      ...fetchParams('POST'),
      body: JSON.stringify({ order_group: { ticket_id: ticketId } })
    })
    .then(response => response.json())
    .then(json => { 
      const normalized = normalize(json, arrayOf(orderGroupSchema));
      dispatch(actions.getOrderGroups(normalized))
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