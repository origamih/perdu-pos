import * as actions from '../actions/index'
import * as api from './api'
import { orderItemClick } from './buttonClickHandlers'

// return an array of Promises so that Promise.all can invoke after all these
export function createOrderItems(orderItems, orderGroupId) {
  return orderItems.map(item => {
    const newItem = { 
      ...item,
      order_group_id: orderGroupId,
      menu_item_id: item.menu_item,
      is_submitted: true
    }
    return api.fetchCreateOrderItem(newItem);
  });
}

export const submitButtonClick = function(ticketId, tableId = '', customerId = '') {
  return (dispatch, getState) => {
    const { entities, nextOrderGroupId, clickedOrders } = getState();
    clickedOrders.map(order => {
      dispatch(orderItemClick(order));
    });
    const newOrderGroup = entities.orderGroups[nextOrderGroupId];
    // let ticket = openedTicket[0];

    if(newOrderGroup){
      let orderGroup = { ...newOrderGroup, user_id: newOrderGroup.user };
      const newOrderItems = newOrderGroup.orders.map(id => {
        return entities.orderItems[id];
      });

      // check if the ticket has already created
      // if no, create one
      if(!ticketId) {
        let ticket = {
          table_id: tableId,
          customer_id: customerId,
          is_open: true
        }
        api.createTicket(ticket)
        .then(createdTicket => {
          dispatch(actions.getCurrentTicket(createdTicket));
          orderGroup.ticket_id = createdTicket.id;
          api.fetchCreateOrderGroup(orderGroup)
          .then(createdOrderGroup => { 
            Promise.all(createOrderItems(newOrderItems, createdOrderGroup.id))
            .then(() => dispatch(api.fetchOrderGroups(createdTicket.id)));
          });
        });
      }

      // if yes, create the order_group and order_items
      else {
        orderGroup.ticket_id = ticketId;
        api.fetchCreateOrderGroup(orderGroup)
        .then(createdOrderGroup => {
          Promise.all(createOrderItems(newOrderItems, createdOrderGroup.id))
          .then(() => dispatch(api.fetchOrderGroups(ticketId)));
        });
      }
    }

  };
}