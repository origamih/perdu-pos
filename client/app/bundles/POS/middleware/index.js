import * as actions from '../actions/index'
import { normalize, Schema, arrayOf } from 'normalizr';

const orderGroupSchema = new Schema('orderGroups');
const orderSchema = new Schema('orderItems');
const menuItemSchema = new Schema('menuItems');
const userSchema = new Schema('users');
const ticketSchema = new Schema('tickets');

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

function filterNewOrderGroup(orderGroups) {
  return orderGroups.filter(og =>{
    return og.is_new;
  });
}



export function menuItemClick(menuItem) {
  return (dispatch, getState) => {
    const { nextOrderGroupId, nextOrderItemId, currentUser, entities } = getState();
    let orderItem = { 
      menu_item: menuItem.id, 
      quantity: 1, 
      order_group_id: nextOrderGroupId,
      id: `new${nextOrderItemId}`
    }
    if(!entities.orderGroups[nextOrderGroupId]) {
      let orderGroup = {
        id: nextOrderGroupId,
        user: currentUser.id,
        is_new: true,
        orders: [orderItem.id]
      }
      dispatch(actions.createOrderGroup(nextOrderGroupId, orderGroup));
      dispatch(actions.updateMenuItems(menuItem));
      dispatch(actions.updateUsers(currentUser));
      dispatch(actions.createOrderItem(nextOrderItemId, orderItem));
    }
    else {
      dispatch(actions.updateMenuItems(menuItem));
      dispatch(actions.createOrderItem(nextOrderItemId, orderItem));
      dispatch(actions.updateOrderGroups(nextOrderGroupId, orderItem));
    }
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
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ menu_item: { menu_category_id: id } }),
      credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(actions.getMenuItems(json)));
    // .catch(err => console.log(err));
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
    .then(json => dispatch(actions.getOpenedTicket(json)))
    .catch(err => console.log(err));
  }
}

export const fetchOrderGroups = function(ticketId, testURL = '') {
  return dispatch => {
    return fetch(testURL + '/order_groups/show_by_params', {
      method: 'POST',
      headers: getHeaders(),
      credentials: 'same-origin',
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
    method: 'POST',
    headers: getHeaders(),
    credentials: 'same-origin',
    body: JSON.stringify({ order_group: orderGroup })
  })
  .then(response => response.json())
  .catch(err => console.log(err));
}

export const fetchCreateOrderItem = function(orderItem, testURL = '') {
  return fetch(testURL + '/orders.json', {
    method: 'POST',
    headers: getHeaders(),
    credentials: 'same-origin',
    body: JSON.stringify({ order: orderItem })
  })
  .then(response => response.json());
}

export const submitButtonClick = function() {
  return (dispatch, getState) => {
    const { openedTicket, currentUser, orderGroups } = getState();
    const newOrderGroupState = filterNewOrderGroup(orderGroups);

    if(newOrderGroupState.length > 0){
      const newOrderGroup = { ticket_id: openedTicket.id, user_id: currentUser.id };
      const newOrderItems = newOrderGroupState[0].orderItems;
      return fetchCreateOrderGroup(newOrderGroup)
      .then(createdOrderGroup => {
        newOrderItems.map(item => {
          item.order_group_id = createdOrderGroup.id;
          item.menu_item_id = item.menu_item.id;
          item.is_submitted = true;
          fetchCreateOrderItem(item)
          .then(dispatch(fetchOrderGroups(openedTicket.id)));
        });
      });
    }
  };
}

export const orderItemClick = function(orderItem) {
  return (dispatch, getState) => {
    dispatch(actions.orderItemClick(orderItem));
    const clickedOrders = getState().clickedOrders;
    var buttons = [];
    if(clickedOrders.length === 0) {
      buttons = [ 'Change Table', 'Select Customer', 'Ticket Note' ];
    }
    if(clickedOrders.length === 1) {
      buttons = [ 'Gift', 'Cancel Gift', 'Void', 'Cancel Void', 'Cancel', 'Move', 'Change Price', '(+)', '(-)' ];
    }
    if(clickedOrders.length > 1) {
      buttons = [ 'Gift', 'Cancel Gift', 'Void', 'Cancel Void', 'Cancel', 'Move' ];
    }
    dispatch(actions.getUtilityButtons(buttons));
  }
}

