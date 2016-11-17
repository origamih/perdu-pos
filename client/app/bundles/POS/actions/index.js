export const ActionTypes = {
  GET_TABLES: 'GET_TABLES',
  GET_MENU_CATEGORIES: 'GET_MENU_CATEGORIES',
  GET_MENU_ITEMS: 'GET_MENU_ITEMS',
  GET_OPENED_TICKET: 'GET_OPENED_TICKET',
  GET_ORDER_GROUPS: 'GET_ORDER_GROUPS',
  GET_ORDER_ITEMS: 'GET_ORDER_ITEMS',
  GET_NEW_ORDERS: 'GET_NEW_ORDERS',
  GET_USER: 'GET_USER',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  ADD_NEW_ORDER_ITEM: 'ADD_NEW_ORDER_ITEM',
  SUBMIT_BUTTON_CLICK: 'SUBMIT_BUTTON_CLICK'
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

export function getOrderItems(orderGroupId, orderItems) {
  return { 
    type: ActionTypes.GET_ORDER_ITEMS, 
    orderItems: orderItems,
    orderGroupId: orderGroupId
  }
}

export function getUser(orderGroupId, user) {
  return { 
    type: ActionTypes.GET_USER, 
    user: user,
    orderGroupId: orderGroupId
  }
}

export function addNewOrderItem(nextOrderGroupId, user, menuItem) {
  return { 
    type: ActionTypes.ADD_NEW_ORDER_ITEM, 
    orderItem: { menu_item: menuItem, quantity: 1 },
    nextOrderGroupId,
    user
  }
}

export function getCurrentUser(user) {
  return { type: ActionTypes.GET_CURRENT_USER, user }
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

export function menuItemClick(menuItem) {
  return (dispatch, getState) => {
    const { nextOrderGroupId, user } = getState();
    dispatch(addNewOrderItem(nextOrderGroupId, user, menuItem));
  }
}

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

export const fetchOrderGroups = function(ticket, testURL = '') {
  const ticketId = ticket ? ticket.id : null;
  return dispatch => {
    return fetch(testURL + '/order_groups/show_by_params', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'same-origin',
      body: JSON.stringify({ order_group: { ticket_id: ticketId } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOrderGroups(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOrderItems = function(orderGroupId, testURL = '') {
  return dispatch => {
    return fetch(testURL + '/orders/show_by_params', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'same-origin',
      body: JSON.stringify({ order: { order_group_id: orderGroupId } })
    })
    .then(response => response.json())
    .then(json => dispatch(getOrderItems(orderGroupId, json)))
    .catch(err => console.log(err));
  }
}

export const fetchUser = function(orderGroup, testURL = '') {
  const userId = orderGroup.user_id;
  return dispatch => {
    return fetch(`${testURL}/users/${userId}.json`)
    .then(response => response.json())
    .then(json => dispatch(getUser(orderGroup.id, json)))
    .catch(err => console.log(err));
  }
}


// export const menuItemClick = function(state, menuItemId, testURL = ''){
//   const newOrders = state.orderItems.filter((orderItem) => {
//     return !orderItem.is_submitted;
//   });
  
// }

// Function to splice orderList state
// var updateNewOrderList = function(order) {
//   var index = this.state.orderList.indexOf(order);
//   var newOrderList = React.addons.update(this.state.orderList, { $splice: [[index, 1, order]] });
//   this.setState({
//     orderList: newOrderList
//   });
// }.bind(this);

// // Function to push new item to orderList state
// var createNewOrderList = function(order) {
//   var newOrderList = React.addons.update(this.state.orderList, { $push: [order] });
//   this.setState({
//     orderList: newOrderList,
//     newOrderId: this.state.newOrderId + 1
//   });
// }.bind(this);
// // Get orders with status = 'new', not submitted yet
// var newOrders = this.state.orderList.filter(function(order) {
//   return order.status === 'new';
// });