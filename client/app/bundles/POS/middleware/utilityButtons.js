import * as actions from '../actions/index'
import * as api from './api'
import { orderItemClick } from './buttonClickHandlers'
import { createOrderItems } from './submitButtonHandler'
import { push } from 'react-router-redux'

var changeTable = function() {
  $('#tableModal').modal();
};

var selectCustomer = function() {

};

var ticketNote = function() {

};

function gift(dispatch, clickedOrders) {
  const submittedOrders = clickedOrders.filter(order => {
    return order.is_submitted && !order.is_void;
  });
  let giftOrders = submittedOrders.map(order => {
    let is_gift = order.is_void ? false : true;
    return { ...order, is_gift };
  });
  giftOrders.map(order => {
    dispatch(api.updateOrderItem(order));
  });
  clickedOrders.map(order => {
    dispatch(orderItemClick(order));
  });
}

function cancelGift(dispatch, clickedOrders) {
  const giftOrders = clickedOrders.filter(order => {
    return order.is_gift && !order.is_void;
  });
  const canceledOrders = giftOrders.map(order => {
    return { ...order, is_gift: false }
  });
  canceledOrders.map(order => {
    dispatch(api.updateOrderItem(order));
  });
  clickedOrders.map(order => {
    dispatch(orderItemClick(order));
  });
}

function voidButton(dispatch, clickedOrders) {
  const submittedOrders = clickedOrders.filter(order => {
    return order.is_submitted;
  });
  const voidOrders = submittedOrders.map(order => {
    return { ...order, is_void: true }
  });
  voidOrders.map(order => {
    dispatch(api.updateOrderItem(order));
  });
  clickedOrders.map(order => {
    dispatch(orderItemClick(order));
  });
}

function cancelVoid(dispatch, clickedOrders) {
  const voidOrders = clickedOrders.filter(order => {
    return order.is_void;
  });
  const cancelVoidOrders = voidOrders.map(order => {
    return { ...order, is_void: false }
  });
  cancelVoidOrders.map(order => {
    dispatch(api.updateOrderItem(order));
  });
  clickedOrders.map(order => {
    dispatch(orderItemClick(order));
  });
}

function cancel(dispatch, clickedOrders, getState) {
  const { nextOrderGroupId, entities } = getState();
  const newOrders = clickedOrders.filter(order => {
    return !order.is_submitted
  });
  newOrders.map(order => {
    dispatch(actions.removeOrderItem(order, nextOrderGroupId));
  });
  
  const newOrderGroup = entities.orderGroups[nextOrderGroupId];
  if(newOrderGroup) {
    if(newOrderGroup.orders.length == 0) {
      dispatch(actions.removeOrderGroup(newOrderGroup));
    }
  }
  clickedOrders.map(order => {
    dispatch(orderItemClick(order));
  });
}

function updateOrders(dispatch, orders, orderGroupId) {
  return orders.map(item => {
    const newItem = { 
      ...item,
      order_group_id: orderGroupId,
      menu_item_id: item.menu_item,
      is_submitted: true
    }
    return dispatch(api.updateOrderItem(newItem));
  });
}

function updateOrderGroupIfNeeded(orderGroups) {
  const submittedOrderGroups = orderGroups.filter(item => {
    return !item.is_new;
  });
  return submittedOrderGroups.map(item => {
    if(item.orders.length == 0) {
      return api.deleteOrderGroup(item);
    }
  });
}

function move(dispatch, getState) {
  // create new ticket, create new order group, 
  // update or create order items
  // then redirect to current table
  const { currentTable, currentCustomer, currentUser, 
    clickedOrders, entities, orderGroupIds } = getState();

  const orderGroups = orderGroupIds.map(id => {
    return entities.orderGroups[id];
  });

  // prevent moving if total order clicks is equal total order
  let totalOrder = 0;
  orderGroups.forEach(item => {
    totalOrder += item.orders.length;
  });
  if(totalOrder == clickedOrders.length) {
    clickedOrders.map(order => {
      dispatch(orderItemClick(order));
    });
    return;
  }

  // remove order from previous ticket
  clickedOrders.map(order => {
    dispatch(actions.removeOrderItem(order, order.order_group_id));
  });
  // update orders to the next ticket
  const submittedOrders = clickedOrders.filter(order => {
    return order.is_submitted
  });
  const newOrders = clickedOrders.filter(order => {
    return !order.is_submitted
  });
  const ticket = {
    table_id: currentTable.id,
    customer_id: currentCustomer.id,
    is_open: true
  }
  api.createTicket(ticket)
  .then(createdTicket => {
    const userGroup = {
      user_id: currentUser.id,
      ticket_id: createdTicket.id
    }
    api.fetchCreateOrderGroup(userGroup)
    .then(createdOrderGroup => {
      Promise.all([
        ...createOrderItems(newOrders, createdOrderGroup.id),
        ...updateOrders(dispatch, submittedOrders, createdOrderGroup.id)
      ])
      .then(() => {
        // remove orderGroup if it has no order
        Promise.all(updateOrderGroupIfNeeded(orderGroups))
        .then(() => {
          clickedOrders.map(order => {
            dispatch(orderItemClick(order));
          });
          dispatch(push(`/all_tables/${currentTable.id}/${createdTicket.id}`));
        });
      });
    })
  });
}

function changePrice(dispatch, clickedOrders) {
  $('#myModal').modal();
  // const newOrder = { ...clickedOrders[0], price: 4 }
  // dispatch(actions.updateOrderItem(newOrder));
  dispatch(orderItemClick(clickedOrders[0]));
}

var add = function() {

};

var sub = function() {

};

export default function utilityButtonClick(button) {
  return (dispatch, getState) => {
    const clickedOrders = getState().clickedOrders;
    switch(button){
      case 'Change Table':
        changeTable(dispatch);
        break;
      case 'Select Customer':
        selectCustomer(dispatch, clickedOrders);
        break;
      case 'Ticket Note':
        ticketNote(dispatch, clickedOrders);
        break;
      case 'Gift':
        gift(dispatch, clickedOrders);
        break;
      case 'Cancel Gift':
        cancelGift(dispatch, clickedOrders);
        break;
      case 'Void':
        voidButton(dispatch, clickedOrders);
        break;
      case 'Cancel Void':
        cancelVoid(dispatch, clickedOrders);
        break;
      case 'Cancel':
        cancel(dispatch, clickedOrders, getState);
        break;
      case 'Move':
        move(dispatch, getState);
        break;
      case 'Change Price':
        changePrice(dispatch, clickedOrders);
        break;
      case '(+)':
        add(dispatch, clickedOrders);
        break;
      case '(-)':
        sub(dispatch, clickedOrders);
        break;
    }

  }
}