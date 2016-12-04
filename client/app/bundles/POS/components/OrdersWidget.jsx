import React, { PropTypes } from 'react'
import MenuCategories from '../containers/MenuCategories';
import MenuItems from '../containers/MenuItems';
import OrderGroups from '../containers/OrderGroups'
import UtilityButtons from '../containers/UtilityButtons'
import { Link } from 'react-router';
import style from './OrdersWidget.scss'

const OrdersWidget = ({ currentTicket, currentCustomer, currentTable, submitButtonClick, quantityChange }) => {
  let status = '';
  if(!currentTicket.id) {
    status = 'New';
  }
  else {
    status = currentTicket.is_open ? 'Unpaid' : 'Paid';
  }
  return (
    <div>
      <div id='utilityButtons' className='col-sm-4 col-md-2'>
        <UtilityButtons></UtilityButtons>
      </div>
      
      <div id='orderItems' className='col-sm-8 col-md-4'>
        <div className='panel panel-default'>
          <div className={`panel-heading ${style.panelHeading}`}>
            <p>Table: {currentTable.name}</p>
            <p>Status: {status}</p>
          </div>
          <div id='orderListBody' className='panel-body'>
            <OrderGroups ticketId={currentTicket.id}></OrderGroups>
          </div>
          <div className={`panel-footer ${style.footer}`}>
            <Link to={`/all_tables/settle/${currentTable.id}/${currentTicket.id}`} className='btn btn-default'>Settle</Link>
            <button 
              className='btn btn-default pull-right' 
              onClick={() => submitButtonClick(currentTicket.id, currentTable.id, currentCustomer.id)}>
              Close
            </button>
          </div>
        </div>
      </div>

      <div id='menuCategories' className='col-sm-4 col-md-2'>
        <MenuCategories/>
      </div>
      
      <div id='menuItems' className='col-sm-8 col-md-4'>
        <div className='panel panel-default'>
          <div id='menuItemsBody' className='panel-body'>
            <MenuItems></MenuItems>
          </div>
          <div className='panel-footer'>
            <form className="form-inline">
              <div className="input-group">
                <span className="input-group-addon">Quantity</span>
                <input type="number" min='1' className="form-control" placeholder='1'
                onChange={(e) => quantityChange(e.target.value)}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

OrdersWidget.propTypes = {
  currentTicket: PropTypes.object.isRequired
}

export default OrdersWidget