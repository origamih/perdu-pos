import { PropTypes } from 'react';
import { connect } from 'react-redux';
import MenuItemsWidget from '../components/MenuItemsWidget';


function mapStateToProps(state) {
  return { menuItems: state.menuItems }
}
let MenuItems = connect(mapStateToProps)(MenuItemsWidget);

export default MenuItems;