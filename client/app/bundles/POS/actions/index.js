export const ActionTypes = {
  GET_TABLES: 'GET_TABLES',
  GET_MENU_CATEGORIES: 'GET_MENU_CATEGORIES',
  GET_MENU_ITEMS: 'GET_MENU_ITEMS',
  GET_OPENED_TICKET: 'GET_OPENED_TICKET',
  GET_ORDER_GROUPS: 'GET_ORDER_GROUPS',
  GET_ORDER_ITEMS: 'GET_ORDER_ITEMS',
  GET_NEW_ORDERS: 'GET_NEW_ORDERS',
  GET_USER: 'GET_USER'
}

// Action Creator 
export function getTables(tables) {
  return { type: ActionTypes.GET_TABLES, tables: tables };
}

export function getMenuCategories(menuCategories) {
  return { type: ActionTypes.GET_MENU_CATEGORIES, menuCategories: menuCategories };
}

export function getMenuItems(menuItems) {
  return { type: ActionTypes.GET_MENU_ITEMS, menuItems: menuItems }
}

export function getOpenedTicket(ticket) {
  return { type: ActionTypes.GET_OPENED_TICKET, ticket: ticket }
}

export function getOrderGroups(orderGroups) {
  return { type: ActionTypes.GET_ORDER_GROUPS, orderGroups: orderGroups }
}

export function getOrderItems(orderItems) {
  return { type: ActionTypes.GET_ORDER_ITEMS, orderItems: orderItems }
}

export function getNewOrder(newOrders) {
  return { type: ActionTypes.GET_NEW_ORDERS, newOrders: newOrders }
}

export function getUser(user) {
  return { type: ActionTypes.GET_USER, user: user }
}

function getHeaders(){
  let token = global.$ ? $('meta[name="csrf-token"]').attr('content') : '';
  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-Token': token,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  return headers
}

// thunks
export const fetchTables = function(testURL = '') {
  return dispatch => {
    return fetch(testURL + '/tables.json')
    .then(response => response.json())
    .then(json => dispatch(getTables(json)))
    .catch(err => console.log(err));
  }
}

export const fetchMenuCategories = function(testURL = '') {
  return dispatch => {
    return fetch(testURL + '/menu_categories.json')
    .then(response => response.json())
    .then(json => dispatch(getMenuCategories(json)))
    .catch(err => console.log(err));
  }
}

export const fetchMenuItems = function(id, testURL = '') {
  return dispatch => {
    return fetch(testURL + '/menu_items/show_by_category', { 
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ menu_item: { menu_category_id: id } }),
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(getMenuItems(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOpenedTicket = function(tableId, customerId, testURL = '') {
  return dispatch => {
    return fetch(testURL + '/tickets/show_by_params', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'same-origin',
      body: JSON.stringify({ ticket: { table_id: tableId, customer_id: customerId, is_open: true } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOpenedTicket(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOrderGroups = function(ticket, user, testURL = '') {
  const ticketId = ticket ? ticket.id : null;
  const userId = user ? user.id : null;
  return dispatch => {
    return fetch(testURL + '/order_groups/show_by_params', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'same-origin',
      body: JSON.stringify({ order_group: { ticket_id: ticketId, user_id: userId } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOrderGroups(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOrderItems = function(orderGroup, testURL = '') {
  const orderGroupId = orderGroup ? orderGroup.id : null;
  return dispatch => {
    return fetch(testURL + '/orders/show_by_params', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'same-origin',
      body: JSON.stringify({ order: { order_groups_id: orderGroupId } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOrderItems(json)))
    .catch(err => console.log(err));
  }
}

export const menuItemClick = function(state, menuItemId, testURL = ''){
  const newOrders = state.orderItems.filter((orderItem) => {
    return orderItem.status === 'new';
  });
  
}