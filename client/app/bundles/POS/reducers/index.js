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
  default:
    return orderGroup;
  }
}


function orderGroups(orderGroups = [], action) {
  switch (action.type) {
  case ActionTypes.GET_ORDER_GROUPS:
    return action.orderGroups.map(group => {
      return orderGroup(group, action)
    })

  case ActionTypes.GET_ORDER_ITEMS:
  case ActionTypes.GET_USER:
    return orderGroups.map(group => {
      return orderGroup(group, action);
    });
  default:
    return orderGroups;
  }
}

// Reducer, equivalent to below code, key of returned object must match the state slice
// function posApp(state = {}, action) {
//   return { tables: tables(state.tables, action) }
// }

// Using combineReducers,  slices of state selected according to their keys
// Or state.'tables' must match 'tables' reducer 
const posApp = combineReducers({ tables, menuCategories, menuItems, orderGroups });
export default posApp