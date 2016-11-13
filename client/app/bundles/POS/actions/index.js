export const ActionTypes = {
  GET_TABLES: 'GET_TABLES',
  GET_MENU_CATEGORIES: 'GET_MENU_CATEGORIES',
  GET_MENU_ITEMS: 'GET_MENU_ITEMS',
  GET_OPENED_TICKETS: 'GET_OPENED_TICKETS',
  GET_ORDER_GROUP: 'GET_ORDER_GROUP',
  GET_ORDER_ITEMS: 'GET_ORDER_ITEMS'
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

export function getOpenedTickets(tickets) {
  return { type: ActionTypes.GET_OPENED_TICKETS, tickets: tickets }
}

export function getOrderGroup(orderGroup) {
  return { type: ActionTypes.GET_ORDER_GROUP, orderGroup: orderGroup }
}

export function getOrderItems(orderItems) {
  return { type: ActionTypes.GET_ORDER_ITEMS, orderItems: orderItems }
}
 

let token = global.$ ? $('meta[name="csrf-token"]').attr('content') : '';
let headers = {
  'X-Requested-With': 'XMLHttpRequest',
  'X-CSRF-Token': token,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

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
      headers: headers,
      body: JSON.stringify({ menu_item: { menu_category_id: id } }),
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(getMenuItems(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOpenedTickets = function(tableId = '', customerId = '', testURL = '') {
  return dispatch => {
    return fetch(testURL + 'tickets/show_by_params', {
      method: 'POST',
      headers: headers,
      credentials: 'same-origin',
      body: JSON.stringify({ tickets: { table_id: tableId, customer_id: customerId, status: 'open' } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOpenedTickets(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOrderGroup = function(ticketId, userId, testURL = '') {
  return dispatch => {
    return fetch(testURL + 'order_groups/show_by_params', {
      method: 'POST',
      headers: headers,
      credentials: 'same-origin',
      body: JSON.stringify({ order_groups: { ticket_id: ticketId, user_id: userId } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOrderGroup(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOrderItems = function(orderGroupId, testURL = '') {
  return dispatch => {
    return fetch(testURL + 'orders/show_by_params', {
      method: 'POST',
      headers: headers,
      credentials: 'same-origin',
      body: JSON.stringify({ orders: { order_groups_id: orderGroupId } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOrderItems(json)))
    .catch(err => console.log(err));
  }
}