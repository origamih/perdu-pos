import * as actions from '../actions/index'


export function menuItemClick(menuItem) {
  return (dispatch, getState) => {
    const { nextOrderGroupId, nextOrderItemId, currentUser, entities } = getState();
    let orderItem = { 
      menu_item: menuItem.id, 
      quantity: 1, 
      order_group_id: nextOrderGroupId,
      is_submitted: false,
      id: `new${nextOrderItemId}`
    }
    if(!entities.orderGroups[nextOrderGroupId]) {
      let orderGroup = {
        id: nextOrderGroupId,
        user: currentUser.id,
        is_new: true,
        orders: [orderItem.id]
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