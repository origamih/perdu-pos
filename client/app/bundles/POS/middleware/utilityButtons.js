import * as actions from '../actions/index'
import * as api from './api'
var changeTable = function() {
  alert('s')
};

var selectCustomer = function() {

};

var ticketNote = function() {

};

function gift(dispatch, clickedOrders) {
  const submittedOrders = clickedOrders.filter(order => {
    return order.is_submitted;
  });
  let giftOrders = submittedOrders.map(order => {
    let is_gift = order.is_void ? false : true;
    return { ...order, is_gift };
  });
  giftOrders.map(order => {
    dispatch(api.updateOrderItem(order));
  });
  clickedOrders.map(order => {
    dispatch(actions.orderItemClick(order));
  });
}

function cancelGift(dispatch, clickedOrders) {
  const giftOrders = clickedOrders.filter(order => {
    return order.is_gift;
  });
  const canceledOrders = giftOrders.map(order => {
    return { ...order, is_gift: false }
  });
  canceledOrders.map(order => {
    dispatch(api.updateOrderItem(order));
  });
  clickedOrders.map(order => {
    dispatch(actions.orderItemClick(order));
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
    dispatch(actions.orderItemClick(order));
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
    dispatch(actions.orderItemClick(order));
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
    dispatch(actions.orderItemClick(order));
  });
}

var move = function() {

};

var changePrice = function() {

};

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
        move(dispatch, clickedOrders);
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