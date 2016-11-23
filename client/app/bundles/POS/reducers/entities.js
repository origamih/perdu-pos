import { ActionTypes } from '../actions/index'

function entity(entity = {}, action) {
  if(action.id in entity) {
    return entity;
  }
  else {
    return { ...entity, [action.id]: action };
  }
}

const defaultEntities = {
  orderGroups: {},
  orderItems: {},
  menuItems: {},
  users: {},
  ticket: {}
};

export default function entities(entities = defaultEntities, action) {
  switch (action.type) {
    case ActionTypes.GET_ORDER_GROUPS:
      if(action.response.entities.orderGroups) {
        return action.response.entities;
      }
      return defaultEntities;

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