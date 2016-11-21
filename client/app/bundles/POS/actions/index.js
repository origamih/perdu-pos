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
  CREATE_ORDER_GROUP: 'CREATE_ORDER_GROUP',
  UPDATE_ORDER_GROUP: 'UPDATE_ORDER_GROUP',
  SUBMIT_BUTTON_CLICK: 'SUBMIT_BUTTON_CLICK',
  GET_UTILITY_BUTTONS: 'GET_UTILITY_BUTTONS',
  ORDER_ITEM_CLICK: 'ORDER_ITEM_CLICK'
}

/* ===========================================================
  action creators
=============================================================*/ 
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

export function getCurrentUser(user) {
  return { type: ActionTypes.GET_CURRENT_USER, user }
}

export function createOrderGroup(orderGroup) {
  return { type: ActionTypes.CREATE_ORDER_GROUP, orderGroup }
}

export function updateOrderGroup(id, orderItems) {
  return { type: ActionTypes.UPDATE_ORDER_GROUP, id, orderItems }
}

export function getUtilityButtons(utilityButtons = [
  'Change Table', 'Select Customer', 'Ticket Note'
]) {
  return { type: ActionTypes.GET_UTILITY_BUTTONS, utilityButtons: utilityButtons }
}

export function orderItemClick(orderItem) {
  return { type: ActionTypes.ORDER_ITEM_CLICK, clickedOrder: orderItem }
}