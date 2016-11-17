// Create this container so that OrderWidget will be able to hot-reload

import OrdersWidget from '../components/OrdersWidget';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/index'

export class Orders extends Component {
  static propTypes = { 
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }
  componentDidMount() {
    this.props.dispatch(getCurrentUser(this.props.user));
  }
  render() {
    return (
      <OrdersWidget params={this.props.params} user={this.props.user}></OrdersWidget>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    params: ownProps.params,
    user: ownProps.route.user
  }
}
export default connect(mapStateToProps)(Orders);