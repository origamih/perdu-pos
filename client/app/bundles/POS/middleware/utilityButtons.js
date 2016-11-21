var changeTable = function() {
  alert('s')
};

var selectCustomer = function() {

};

var ticketNote = function() {

};

function gift(dispatch, getState) {
  const submittedOrders = getState().clickedOrders.filter(function(order) {
    return order.is_submitted;
  });
  let giftOrders = submittedOrders.map(order => {
    order.is_gift = order.is_void ? false : true;
    return order;
  });
  let giftOrderGroups = giftOrders.reduce((group, order) => {
    if(order.order_group_id in group) {
      group[order.order_group_id].push(order)
    }
    else {
      group[order.order_group_id] = [order];
    }
    return group;
  }, {});
  let orderGroups = getState().orderGroups;
  giftOrderGroups.keys.forEach(gog => {
    let orderGroup = orderGroups.filter(og => {
      return og.id == gog;
    });
    let orderItems = orderGroups.orderItems
  });

}

var cancelGift = function() {
  var giftOrders = this.state.clickedOrders.filter(function(order) {
    return order.is_gift;
  });
  giftOrders.forEach( (order) => {
    order.is_gift = false;
    this.updateOrder(order, order.id);
  });
  this.setState({ clickedOrders: [] }, this.removeAllClickedState);
};

var voidButton = function() {
  var submittedOrders = this.state.clickedOrders.filter(function(order) {
    return order.status === 'submitted';
  });
  submittedOrders.forEach(function(order) {
    order.is_void = true;
    order.is_gift = false;
    this.updateOrder(order, order.id);
  }.bind(this));
  this.setState({ clickedOrders: [] }, this.removeAllClickedState);
};

var cancelVoid = function() {
  var voidOrders = this.state.clickedOrders.filter(function(order) {
    return order.is_void;
  });
  voidOrders.forEach( (order) => {
    order.is_void = false;
    this.updateOrder(order, order.id);
  });
  this.setState({ clickedOrders: [] }, this.removeAllClickedState);
};

var cancel = function() {
  // Remove clickedOrders with status = 'new'
  var cancelOrders = this.state.clickedOrders.filter(function(clickedOrder) {
    return clickedOrder.status === 'new';
  });
  var orderList = this.state.orderList;
  orderList = this.removeArrayFromArray(cancelOrders, orderList);
  this.setState({
    orderList: orderList,
    clickedOrders: []
  }, this.removeAllClickedState);
};

var move = function() {

};

var changePrice = function() {

};

var add = function() {

};

var sub = function() {

};

export default function utilityButtonClick(button) {
  return (dispatch, getState) => {
    switch(button){
      case 'Change Table':
        changeTable(dispatch);
        break;
      case 'Select Customer':
        selectCustomer();
        break;
      case 'Ticket Note':
        ticketNote();
        break;
      case 'Gift':
        gift(dispatch, getState);
        break;
      case 'Cancel Gift':
        cancelGift();
        break;
      case 'Void':
        voidButton();
        break;
      case 'Cancel Void':
        cancelVoid();
        break;
      case 'Cancel':
        cancel();
        break;
      case 'Move':
        move();
        break;
      case 'Change Price':
        changePrice();
        break;
      case '(+)':
        add();
        break;
      case '(-)':
        sub();
        break;
    }

  }
}