import * as actions from '../actions/index'
import * as api from './api'
import { push } from 'react-router-redux'

export function menuItemClick(menuItem, quantity) {
  return (dispatch, getState) => {
    const { nextOrderGroupId, nextOrderItemId, currentUser, entities } = getState();
    let orderItem = { 
      menu_item: menuItem.id, 
      quantity: quantity, 
      order_group_id: nextOrderGroupId,
      is_submitted: false,
      id: `new${nextOrderItemId}`
    }
    dispatch(actions.updateMenuItems(menuItem));
    
    if(!entities.orderGroups[nextOrderGroupId]) {
      let orderGroup = {
        id: nextOrderGroupId,
        user: currentUser.id,
        is_new: true,
        orders: [orderItem.id]
      }
      dispatch(actions.createOrderGroup(nextOrderGroupId, orderGroup));
      dispatch(actions.updateUsers(currentUser));
      dispatch(actions.createOrderItem(nextOrderItemId, orderItem));
    }
    else {
      const newOrderItems = entities.orderGroups[nextOrderGroupId].orders.map(id => {
        return entities.orderItems[id];
      });
      let shouldCreateOrder = true;
      newOrderItems.forEach(item => {
        if(item.menu_item == orderItem.menu_item) {
          shouldCreateOrder = false;
          item.quantity += orderItem.quantity;
          dispatch(actions.updateOrderItem(item));
          return
        }
      });
      if(shouldCreateOrder) {
        dispatch(actions.createOrderItem(nextOrderItemId, orderItem));
        dispatch(actions.updateOrderGroups(nextOrderGroupId, orderItem));
      }
    }
  }
}

export const orderItemClick = function(orderItem) {
  return (dispatch, getState) => {
    dispatch(actions.orderItemClick(orderItem));
    const clickedOrders = getState().clickedOrders;
    var buttons = [];
    if(clickedOrders.length === 0) {
      buttons = [ 'Change Table' ];
    }
    if(clickedOrders.length > 0) {
      buttons = [ 'Gift', 'Cancel Gift', 'Void', 'Cancel Void', 'Cancel', 'Move' ];
    }
    dispatch(actions.getUtilityButtons(buttons));
  }
}

export const ticketClick = ticket => {
  return dispatch => {
    dispatch(actions.ticketClick(ticket));
  }
}

function updateOrderGroups(orderGroups) {
  return orderGroups.map(og => {
    return api.updateOrderGroup(og);
  });
}

function processOrderGroups(response, newTicketId) {
  const orderGroupIds = response.result;
  const orderGroups = orderGroupIds.map(id => {
    return response.entities.orderGroups[id];
  });
  const newOrderGroups = orderGroups.map(og => {
    return { ...og, ticket_id: newTicketId }
  });
  return Promise.all(updateOrderGroups(newOrderGroups));
}

function updateTickets(oldTickets, newTicketId) {
  return oldTickets.map(ticket => {
    return api.getOrderGroups(ticket.id)
    .then(response => processOrderGroups(response, newTicketId))
    .then(() => api.deleteTicket(ticket));
  });
}
export const mergeTickets = (tickets, currentTable) => {
  return dispatch => {
    const newTicketId = tickets[0].id;
    const oldTickets = tickets.filter(ticket => {
      return ticket.id !== newTicketId;
    });

    Promise.all(updateTickets(oldTickets, newTicketId))
    .then(() => {
      // redirect to new ticket
      dispatch(push(`/all_tables/${currentTable.id}/${newTicketId}`));
    });
  }
}

export const tableClick = (table, shouldRedirect) => {
  return (dispatch, getState) => {
    if(shouldRedirect) {
      dispatch(push(`/all_tables/${table.id}`))
    }
    else {
      const currentTicket = getState().currentTicket;
      const newTicket = { ...currentTicket, table_id: table.id };
      api.updateTicket(newTicket)
      .then(() => {
        dispatch(push(`/all_tables/${table.id}`));
      });
    }
  }
}

export const quantityChange = value => {
  return dispatch => {
    if(value <= 1){
      dispatch(actions.quantityChange(1));
    }
    else {
      dispatch(actions.quantityChange(value));
    }
  }
}