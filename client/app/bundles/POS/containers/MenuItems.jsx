import { PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuItemsWidget from '../components/MenuItemsWidget';
import { menuItemClick } from '../middleware/index'


function mapStateToProps(state) {
  return { menuItems: state.menuItems }
}
function mapDispatchToProps(dispatch) {
  return { 
    onClick: (menuItem) => {
      dispatch(menuItemClick(menuItem))
    }
  }
}
let MenuItems = connect(mapStateToProps, mapDispatchToProps)(MenuItemsWidget);

export default MenuItems;