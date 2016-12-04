import { PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuItemsWidget from '../components/MenuItemsWidget';
import { menuItemClick } from '../middleware/buttonClickHandlers'


function mapStateToProps(state) {
  return { 
    menuItems: state.menuItems,
    quantity: state.quantity
  }
}
function mapDispatchToProps(dispatch) {
  return { 
    onClick: (menuItem, quantity) => {
      dispatch(menuItemClick(menuItem, quantity))
    }
  }
}
let MenuItems = connect(mapStateToProps, mapDispatchToProps)(MenuItemsWidget);

export default MenuItems;