import React, { Component } from 'react';
import { Link } from 'react-router';
import MenuCategories from '../containers/MenuCategories';
import MenuItems from '../containers/MenuItems';
import OrderGroups from '../containers/OrderGroups'

const OrdersWidget = ({ params, submitButtonClick }) => {
  return (
    <div className='row' id='orderBody'>

      <div id='utilityButtons' className='col-sm-4 col-md-2'>
        utilityButtons
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
            <div>
              <h2>Balance: </h2>
            </div>
          </div>
          <div className='panel-footer'>
            <button className='btn btn-default'>Settle</button>
            <button className='btn btn-warning' onClick={submitButtonClick}>Submit</button>
            <Link  className='btn btn-danger'>Close</Link>
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

export default OrdersWidget
