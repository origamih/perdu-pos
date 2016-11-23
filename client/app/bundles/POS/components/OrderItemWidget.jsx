import React, { PropTypes } from 'react'

const OrderItemWidget = ({ orderItem, quantity, menuItem, isNew, onClick, clickedOrders }) => {
  let aStyle = {};
  let extraStatus = '';
  if(orderItem.is_gift){
    aStyle = {};
    extraStatus = ' ,gift';
  }
  else {
    if(orderItem.is_void){
      aStyle = { color: '#777' };
      extraStatus = ' ,void';
    }
    else {
      if(isNew){
        aStyle = { color: '#333333'}
      }
      else {
        aStyle = { color: '#ce4844' }
      }
    }
  }
  let clicked = false;
  clickedOrders.forEach(clickedOrder => {
    if(clickedOrder === orderItem) {
      clicked = true;
      return
    }
  });
  let trStyle = clicked ? { backgroundColor: 'rgba(0, 123, 255, 0.33)' } : {}
  return (
    <tr style={trStyle}>
      <td>
        <a href="#" className="row" style={aStyle} onClick={e => {
          e.preventDefault();
          onClick()
        }}>
          <span className="col-xs-1">{quantity}</span>
          <span className='col-xs-9'>
            <p className="order-name">{menuItem.name}</p>
            <p className="order-status">
              {isNew ? 'new' : 'submitted'}
              <span>{extraStatus}</span>
            </p>
          </span>
          <span className='col-xs-2'>{menuItem.price * quantity}</span>
        </a>
      </td>
    </tr>
  );
}

OrderItemWidget.propTypes = {
  orderItem: PropTypes.object.isRequired,
  quantity: PropTypes.number.isRequired,
  menuItem: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  clickedOrders: PropTypes.array.isRequired
}
export default OrderItemWidget