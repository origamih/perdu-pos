import * as actions from '../actions/index'

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
    const { nextOrderGroupId, user, orderGroups } = getState();
    const newOrderGroup = filterNewOrderGroup(orderGroups);
    if(newOrderGroup.length == 0) {
      let orderGroup = {
        id: nextOrderGroupId,
        user: user,
        is_new: true,
        orderItems: [{ menu_item: menuItem, quantity: 1 }]
      }
      dispatch(actions.createOrderGroup(orderGroup));
    }
    else {
      let orderItem = { menu_item: menuItem, quantity: 1 };
      dispatch(actions.updateOrderGroup(nextOrderGroupId, orderItem));
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
    .then(json => dispatch(actions.getMenuItems(json)))
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
    .then(json => dispatch(actions.getOpenedTicket(json)))
    .catch(err => console.log(err));
  }
}

export const loadOrders = function(ticket) {
  const ticketId = ticket ? ticket.id : null;
  return dispatch => {
    dispatch(fetchOrderGroups(ticketId))
    .then(action => {
      action.orderGroups.map(orderGroup => {
        dispatch(fetchOrderItems(orderGroup.id));
        dispatch(fetchUser(orderGroup));
      });
    })
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
    .then(json => dispatch(actions.getOrderGroups(json)))
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
    .then(json => dispatch(actions.getOrderItems(orderGroupId, json)))
    .catch(err => console.log(err));
  }
}

export const fetchUser = function(orderGroup, testURL = '') {
  const userId = orderGroup.user_id;
  return dispatch => {
    return fetch(`${testURL}/users/${userId}.json`)
    .then(response => response.json())
    .then(json => dispatch(actions.getUser(orderGroup.id, json)))
    .catch(err => console.log(err));
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
          .then(dispatch(loadOrders(openedTicket)));
        });
      });
    }
  };
}