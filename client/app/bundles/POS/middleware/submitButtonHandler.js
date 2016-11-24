import * as actions from '../actions/index'
import * as api from './api'

// return an array of Promises so that Promise.all can invoke after all these
function createOrderItems(orderItems, orderGroupId) {
  return orderItems.map(item => {
    item.order_group_id = orderGroupId;
    item.menu_item_id = item.menu_item;
    item.is_submitted = true;
    return api.fetchCreateOrderItem(item);
  });
}

export const submitButtonClick = function(tableId = '', customerId = '') {
  return (dispatch, getState) => {
    const { openedTicket, entities, nextOrderGroupId } = getState();
    const newOrderGroup = entities.orderGroups[nextOrderGroupId];
    let ticket = openedTicket;
    let orderGroup = { ...newOrderGroup, user_id: newOrderGroup.user };

    if(newOrderGroup){

      const newOrderItems = newOrderGroup.orders.map(id => {
        return entities.orderItems[id];
      });

      // check if the ticket has already created
      // if no, create one
      if(!openedTicket) {
        ticket = {
          table_id: tableId,
          customer_id: customerId,
          is_open: true
        }
        api.createTicket(ticket)
        .then(createdTicket => {
          dispatch(actions.getOpenedTicket(createdTicket));
          orderGroup.ticket_id = createdTicket.id;
          api.fetchCreateOrderGroup(orderGroup)
          .then(createdOrderGroup => { 
            Promise.all(createOrderItems(newOrderItems, createdOrderGroup.id))
            .then(() => dispatch(api.fetchOrderGroups(createdTicket)));
          });
        });
      }

      // if yes, create the order_group and order_items
      else {
        orderGroup.ticket_id = ticket.id;
        api.fetchCreateOrderGroup(orderGroup)
        .then(createdOrderGroup => {
          Promise.all(createOrderItems(newOrderItems, createdOrderGroup.id))
          .then(() => dispatch(api.fetchOrderGroups(ticket)));
        });
      }
    }

  };
}