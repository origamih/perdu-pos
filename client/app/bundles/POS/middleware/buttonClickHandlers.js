import * as actions from '../actions/index'
import * as api from './index.js'
export function menuItemClick(menuItem) {
  return (dispatch, getState) => {
    const { openedTicket, nextOrderGroupId, nextOrderItemId, currentUser, entities } = getState();
    let orderItem = { 
      menu_item: menuItem.id, 
      quantity: 1, 
      order_group_id: nextOrderGroupId,
      id: `new${nextOrderItemId}`
    }
    if(!entities.orderGroups[nextOrderGroupId]) {
      let orderGroup = {
        id: nextOrderGroupId,
        user: currentUser.id,
        is_new: true,
        orders: [orderItem.id],
        ticket_id: openedTicket.id
      }
      dispatch(actions.createOrderGroup(nextOrderGroupId, orderGroup));
      dispatch(actions.updateMenuItems(menuItem));
      dispatch(actions.updateUsers(currentUser));
      dispatch(actions.createOrderItem(nextOrderItemId, orderItem));
    }
    else {
      dispatch(actions.updateMenuItems(menuItem));
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

export const submitButtonClick = function() {
  return (dispatch, getState) => {
    const { openedTicket, entities, nextOrderGroupId } = getState();
    const newOrderGroup = entities.orderGroups[nextOrderGroupId]
    if(newOrderGroup){
      const orderGroup = { ...newOrderGroup, user_id: newOrderGroup.user };
      const newOrderItems = newOrderGroup.orders.map(id => {
        return entities.orderItems[id];
      });
      return api.fetchCreateOrderGroup(orderGroup)
      .then(createdOrderGroup => {
        newOrderItems.map(item => {
          item.order_group_id = createdOrderGroup.id;
          item.menu_item_id = item.menu_item;
          item.is_submitted = true;
          api.fetchCreateOrderItem(item)
          .then(dispatch(api.fetchOrderGroups(openedTicket.id)));
        });
      });
    }
  };
}

export const orderItemClick = function(orderItem) {
  return (dispatch, getState) => {
    dispatch(actions.orderItemClick(orderItem));
    const clickedOrders = getState().clickedOrders;
    var buttons = [];
    if(clickedOrders.length === 0) {
      buttons = [ 'Change Table', 'Select Customer', 'Ticket Note' ];
    }
    if(clickedOrders.length === 1) {
      buttons = [ 'Gift', 'Cancel Gift', 'Void', 'Cancel Void', 'Cancel', 'Move', 'Change Price', '(+)', '(-)' ];
    }
    if(clickedOrders.length > 1) {
      buttons = [ 'Gift', 'Cancel Gift', 'Void', 'Cancel Void', 'Cancel', 'Move' ];
    }
    dispatch(actions.getUtilityButtons(buttons));
  }
}