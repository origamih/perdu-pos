import { combineReducers } from 'redux';
import { ActionTypes } from '../actions/index'

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

function orderGroup(orderGroup = { orderItems: [], user: {} }, action) {
  switch (action.type) {
    case ActionTypes.UPDATE_ORDER_GROUP:
      if(orderGroup.id !== action.id) {
        return orderGroup;
      }
      return { ...orderGroup, orders: action.orderItems }
    default:
      return orderGroup;
  }
}

function entity(entity = {}, action) {
  if(action.id in entity) {
    return entity;
  }
  else {
    return { ...entity, [action.id]: action.entity };
  }
}

function entities(entities = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_ORDER_GROUPS:
      if(action.response && action.response.entities) {
        return action.response.entities;
      }
      return entities;

    case ActionTypes.CREATE_ORDER_GROUP: {
      const orderGroups = { ...entities.orderGroups, [action.id]: action.orderGroup };
      return { ...entities, orderGroups }
    }
    case ActionTypes.UPDATE_MENU_ITEMS: {
      const menuItems = entity(entities.menuItems, action.menuItem);
      return { ...entities, menuItems }
    }
    case ActionTypes.UPDATE_USERS: {
      const users = entity(entities.users, action.user);
      return { ...entities, users }
    }
    case ActionTypes.CREATE_ORDER_ITEM: {
      const orderItems = { ...entities.orderItems, [`new${action.id}`]: action.orderItem };
      return { ...entities, orderItems }
    }
    case ActionTypes.UPDATE_ORDER_ITEM: {
      const orderItems = { ...entities.orderItems, [action.orderItem.id]: action.orderItem };
      return { ...entities, orderItems }
    }

    case ActionTypes.UPDATE_ORDER_GROUPS: {
      const orderItemIds = [ ...entities.orderGroups[action.id].orders, action.orderItem.id ]
      const orderGroup = { ...entities.orderGroups[action.id], orders: orderItemIds }
      const orderGroups = { ...entities.orderGroups, [action.id]: orderGroup }
      return { ...entities, orderGroups }
    }

    default:
      return entities;
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

function openedTicket(openedTicket = {}, action) {
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
  orderGroupIds
});
export default posApp