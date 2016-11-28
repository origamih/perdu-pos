import { combineReducers } from 'redux';
import { ActionTypes } from '../actions/index'
import entities from './entities'
import update from 'immutability-helper'
function tables(tables = [], action) {
  switch (action.type) {
    case ActionTypes.GET_TABLES:
      return action.tables;
    default:
      return tables;
  }
}

function menuCategories(menuCategories = [], action) {
  switch (action.type) {
    case ActionTypes.GET_MENU_CATEGORIES:
      return action.menuCategories;
    default:
      return menuCategories;
  }
}

function menuItems(menuItems = [], action) {
  switch (action.type) {
    case ActionTypes.GET_MENU_ITEMS:
      return action.menuItems;
    default:
      return menuItems;
  }
}

function orderGroupIds(orderGroupIds = [], action) {
  switch(action.type) {
    case ActionTypes.GET_ORDER_GROUPS:
      if(action.response && action.response.result) {
        return action.response.result;
      }
      return orderGroupIds;
    case ActionTypes.CREATE_ORDER_GROUP:
      return [...orderGroupIds, action.id];
    case ActionTypes.REMOVE_ORDER_GROUP: {
      const index = orderGroupIds.indexOf(action.orderGroup.id);
      return update(orderGroupIds, { $splice: [[index, 1]] });
    }
    default:
      return orderGroupIds;
  }
}

function nextOrderGroupId(nextOrderGroupId = 0, action) {
  switch (action.type) {
    case ActionTypes.GET_ORDER_GROUPS: {
      let index = action.response.result.length;
      return index > 0 ? action.response.result[index - 1] + 1 : 0;
    }
    case ActionTypes.REMOVE_ORDER_GROUP:
      return nextOrderGroupId + 1;
    default:
      return nextOrderGroupId;
  }
}

function nextOrderItemId(nextOrderItemId = 0, action) {
  switch (action.type) {
    case ActionTypes.CREATE_ORDER_ITEM:
      return nextOrderItemId + 1;
    default:
      return nextOrderItemId;
  }
}

function currentUser(currentUser = {}, action){
  switch (action.type) {
    case ActionTypes.GET_CURRENT_USER:
      return action.user;
    default:
      return currentUser;
  }
}

function openedTicket(openedTicket = [], action) {
  switch(action.type) {
    case ActionTypes.GET_OPENED_TICKET: 
      return action.ticket;
    default:
      return openedTicket;
  }
}

function utilityButtons(utilityButtons = [
  'Change Table', 'Select Customer', 'Ticket Note'
], action) {
  switch(action.type) {
    case ActionTypes.GET_UTILITY_BUTTONS:
      return action.utilityButtons;
    default:
      return utilityButtons;
  }
}

function clickedOrders(clickedOrders = [], action) {
  switch(action.type) {
    case ActionTypes.ORDER_ITEM_CLICK:
      var filteredOrders = clickedOrders.filter(clickedOrder => {
        return !(clickedOrder === action.clickedOrder)
      });
      if(filteredOrders.length == clickedOrders.length) {
        return [...clickedOrders, action.clickedOrder]
      }
      else {
        return filteredOrders
      }
    default:
      return clickedOrders;
  }
}

function clickedTickets(clickedTickets = [], action) {
  switch(action.type) {
    case ActionTypes.TICKET_CLICK:
      var filteredTickets = clickedTickets.filter(clickedTicket => {
        return !(clickedTicket === action.ticket)
      });
      if(filteredTickets.length == clickedTickets.length) {
        return [...clickedTickets, action.ticket]
      }
      else {
        return filteredTickets;
      }
    default:
      return clickedTickets;
  }
}

// Reducer, equivalent to below code, key of returned object must match the state slice
// function posApp(state = {}, action) {
//   return { tables: tables(state.tables, action) }
// }

// Using combineReducers,  slices of state selected according to their keys
// Or state.'tables' must match 'tables' reducer 
const posApp = combineReducers({ 
  tables, 
  menuCategories, 
  menuItems, 
  entities, 
  nextOrderGroupId,
  nextOrderItemId,
  currentUser,
  openedTicket,
  utilityButtons,
  clickedOrders,
  orderGroupIds,
  clickedTickets
});
export default posApp