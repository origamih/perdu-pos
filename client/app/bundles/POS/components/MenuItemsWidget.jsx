import React, { PropTypes } from 'react';

const MenuItemsWidget = ({ menuItems, onClick, quantity }) => {
  let items = menuItems.map(menuItem => {
    return <button key={menuItem.id} 
      className='btn btn-success' 
      onClick={() => onClick(menuItem, quantity)}>{menuItem.name}
      </button>
  });
  return <div>{items}</div>
}

MenuItemsWidget.propTypes = { menuItems: PropTypes.array.isRequired }

export default MenuItemsWidget