import React, { PropTypes } from 'react'
import MenuCategories from '../containers/MenuCategories';
import MenuItems from '../containers/MenuItems';
import OrderGroups from '../containers/OrderGroups'
import UtilityButtons from '../containers/UtilityButtons'
import { Link } from 'react-router';
import style from './OrdersWidget.scss'

const OrdersWidget = ({ currentTicket, currentCustomer, currentTable, submitButtonClick, quantityChange }) => {
  return (
    <div>
      <div id='utilityButtons' className='col-sm-4 col-md-2'>
        <UtilityButtons></UtilityButtons>
      </div>
      
      <div id='orderItems' className='col-sm-8 col-md-4'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <p>Table: {currentTable.name}</p>
            <p>Status: </p>
          </div>
          <div id='orderListBody' className='panel-body'>
            <OrderGroups ticketId={currentTicket.id}></OrderGroups>
          </div>
          <div className={`panel-footer ${style.footer}`}>
            <Link to={`/all_tables/settle/${currentTable.id}/${currentTicket.id}`} className='btn btn-default'>Settle</Link>
            <button 
              className='btn btn-default' 
              onClick={() => submitButtonClick(currentTicket.id, currentTable.id, currentCustomer.id)}>
              Submit
            </button>
            <Link to="/home/all_tables" className='btn btn-danger pull-right'>Close</Link>
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