import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import MenuCategories from '../containers/MenuCategories';
import MenuItems from '../containers/MenuItems';
import OrderGroups from '../containers/OrderGroups'
import UtilityButtons from '../containers/UtilityButtons'

const OrdersWidget = ({ params, submitButtonClick }) => {
  return (
    <div className='row' id='orderBody'>

      <div id='utilityButtons' className='col-sm-4 col-md-2'>
        <UtilityButtons></UtilityButtons>
      </div>
      
      <div id='orderItems' className='col-sm-8 col-md-4'>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <p>Table: {params.table_id}</p>
            <p>Customer: </p>
            <p>Status: </p>
          </div>
          <div id='orderListBody' className='panel-body'>
            <OrderGroups 
              tableId={params.table_id || null} 
              customerId={params.customer_id || null}>
            </OrderGroups>
          </div>
          <div className='panel-footer'>
            <div>
              <h2>Balance: </h2>
            </div>
            <button className='btn btn-default'>Settle</button>
            <button className='btn btn-warning' onClick={submitButtonClick}>Submit</button>
            <Link to="/home/all_tables" className='btn btn-danger'>Close</Link>
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
            MenuItemUtiliTies
          </div>
        </div>
      </div>

    </div>
  );
}
OrdersWidget.propTypes = {
  params: PropTypes.object.isRequired,
  submitButtonClick: PropTypes.func.isRequired
}
export default OrdersWidget
