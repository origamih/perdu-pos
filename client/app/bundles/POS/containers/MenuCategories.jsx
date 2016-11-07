import { connect } from 'react-redux';
import { fetchMenuCategories, fetchMenuItems } from '../actions/index';
import React, { Component, PropTypes } from 'react';
import MenuCategoriesWidget from '../components/MenuCategoriesWidget';

export class MenuCategories extends Component {
  static propTypes = {
    menuCategories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  constructor(props)
  {
    super(props);

  }
  componentDidMount() {
    this.props.dispatch(fetchMenuCategories());
  }
  render() {
    const { menuCategories, dispatch } = this.props;
    return (
      <MenuCategoriesWidget menuCategories={menuCategories} onClick={(id) => dispatch(fetchMenuItems(id))}/>
    );
  }
}

function mapStateToProps(state) {
  return { menuCategories: state.menuCategories }
}

export default connect(mapStateToProps)(MenuCategories);