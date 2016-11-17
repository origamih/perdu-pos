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
    case ActionTypes.GET_ORDER_GROUPS:
      return { ...orderGroup, orderItems: [], user: {} }

    case ActionTypes.GET_ORDER_ITEMS:
      if(orderGroup.id !== action.orderGroupId) {
        return orderGroup;
      }
      return { ...orderGroup, orderItems: action.orderItems };

    case ActionTypes.GET_USER:
      if(orderGroup.id !== action.orderGroupId) {
        return orderGroup;
      }
      return { ...orderGroup, user: action.user }

    case ActionTypes.UPDATE_ORDER_GROUP:
      if(orderGroup.id !== action.id) {
        return orderGroup;
      }
      return { ...orderGroup, orderItems: [...orderGroup.orderItems, action.orderItem] }
    default:
      return orderGroup;
  }
}

function orderGroups(orderGroups = [], action) {
  switch (action.type) {
    
    case ActionTypes.GET_ORDER_GROUPS:
      return action.orderGroups.map(group => {
        return orderGroup(group, action)
      });
    case ActionTypes.GET_ORDER_ITEMS:
    case ActionTypes.GET_USER:
      return orderGroups.map(og => {
        return orderGroup(og, action);
      });


    case ActionTypes.CREATE_ORDER_GROUP:
      return [...orderGroups, action.orderGroup];
    case ActionTypes.UPDATE_ORDER_GROUP:
      return orderGroups.map(og => {
        return orderGroup(og, action)
      });

    // case ActionTypes.SUBMIT_BUTTON_CLICK: {
    //   let newOrderGroup = orderGroups.filter
    // }
    default:
      return orderGroups;
  }
}

function nextOrderGroupId(nextOrderGroupId = 0, action) {
  switch (action.type) {
    case ActionTypes.GET_ORDER_GROUPS: {
      let index = action.orderGroups.length;
      return index > 0 ? action.orderGroups[index - 1].id + 1 : 0;
    }
    default:
      return nextOrderGroupId;
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
  orderGroups, 
  nextOrderGroupId, 
  currentUser,
  openedTicket
});
export default posApp