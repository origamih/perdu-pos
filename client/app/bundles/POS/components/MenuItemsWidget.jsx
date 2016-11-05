import React, { PropTypes } from 'react';

const MenuItemsWidget = ({ menuItems }) => {
  let items = menuItems.map(menuItem => {
    return <button key={menuItem.id} className='btn btn-success'>{menuItem.name}</button>
  });
  return <div>{items}</div>
}

MenuItemsWidget.propTypes = { menuItems: PropTypes.array.isRequired }

export default MenuItemsWidget