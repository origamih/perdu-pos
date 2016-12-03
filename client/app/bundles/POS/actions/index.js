export const ActionTypes = {
  GET_TABLES: 'GET_TABLES',
  GET_MENU_CATEGORIES: 'GET_MENU_CATEGORIES',
  GET_MENU_ITEMS: 'GET_MENU_ITEMS',
  GET_OPENED_TICKET: 'GET_OPENED_TICKET',
  GET_ORDER_GROUPS: 'GET_ORDER_GROUPS',
  GET_NEW_ORDERS: 'GET_NEW_ORDERS',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
  CREATE_ORDER_GROUP: 'CREATE_ORDER_GROUP',
  UPDATE_ORDER_GROUPS: 'UPDATE_ORDER_GROUPS',
  SUBMIT_BUTTON_CLICK: 'SUBMIT_BUTTON_CLICK',
  GET_UTILITY_BUTTONS: 'GET_UTILITY_BUTTONS',
  ORDER_ITEM_CLICK: 'ORDER_ITEM_CLICK',
  UPDATE_MENU_ITEMS: 'UPDATE_MENU_ITEMS',
  CREATE_ORDER_ITEM: 'CREATE_ORDER_ITEM',
  UPDATE_USERS: 'UPDATE_USERS',
  UPDATE_ORDER_ITEM: 'UPDATE_ORDER_ITEM',
  REMOVE_ORDER_ITEM: 'REMOVE_ORDER_ITEM',
  REMOVE_ORDER_GROUP: 'REMOVE_ORDER_GROUP',
  TICKET_CLICK: 'TICKET_CLICK',
  REQUEST_TICKETS: 'REQUEST_TICKETS',
  RECEIVE_TICKETS: 'RECEIVE_TICKETS',
  GET_CURRENT_TICKET: 'GET_CURRENT_TICKET',
  GET_CURRENT_TABLE: 'GET_CURRENT_TABLE',
  GET_CURRENT_CUSTOMER: 'GET_CURRENT_CUSTOMER',
  GET_BALANCE: 'GET_BALANCE',
  GET_PAYMENT: 'GET_PAYMENT'
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

export function getOrderGroups(response) {
  return { type: ActionTypes.GET_ORDER_GROUPS, response }
}

export function getCurrentUser(user) {
  return { type: ActionTypes.GET_CURRENT_USER, user }
}

export function createOrderGroup(id, orderGroup) {
  return { type: ActionTypes.CREATE_ORDER_GROUP, orderGroup, id }
}

export function updateOrderGroups(id, orderItem) {
  return { type: ActionTypes.UPDATE_ORDER_GROUPS, id, orderItem }
}

export function getUtilityButtons(utilityButtons = ['Change Table']) {
  return { type: ActionTypes.GET_UTILITY_BUTTONS, utilityButtons: utilityButtons }
}

export function orderItemClick(orderItem) {
  return { type: ActionTypes.ORDER_ITEM_CLICK, clickedOrder: orderItem }
}

export function updateMenuItems(menuItem) {
  return { type: ActionTypes.UPDATE_MENU_ITEMS, menuItem }
}

export function updateUsers(user) {
  return { type: ActionTypes.UPDATE_USERS, user }
}

export function createOrderItem(id, orderItem) {
  return { type: ActionTypes.CREATE_ORDER_ITEM, orderItem, id }
}

export function updateOrderItem(orderItem) {
  return { type: ActionTypes.UPDATE_ORDER_ITEM, orderItem }
}

export function removeOrderItem(orderItem, orderGroupId) {
  return { type: ActionTypes.REMOVE_ORDER_ITEM, orderItem, orderGroupId }
}

export function removeOrderGroup(orderGroup) {
  return { type: ActionTypes.REMOVE_ORDER_GROUP, orderGroup }
}

export function ticketClick(ticket) {
  return { type: ActionTypes.TICKET_CLICK, ticket }
}

export function requestTickets() {
  return { type: ActionTypes.REQUEST_TICKETS }
}

export function receiveTickets() {
  return { type: ActionTypes.RECEIVE_TICKETS }
}

export function getCurrentTicket(ticket) {
  return { type: ActionTypes.GET_CURRENT_TICKET, ticket }
}

export function getCurrentTable(table) {
  return { type: ActionTypes.GET_CURRENT_TABLE, table }
}

export function getCurrentCustomer(customer) {
  return { type: ActionTypes.GET_CURRENT_CUSTOMER, customer }
}

export function getBalance(balance) {
  return { type: ActionTypes.GET_BALANCE, balance }
}

export function getPayment(payment) {
  return { type: ActionTypes.GET_PAYMENT, payment }
}