import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchOpenedTicket, fetchOrderGroups } from '../actions/index'
import OrderGroupsWidget from '../components/OrderGroupsWidget'

export class OrderGroups extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    orderGroups: PropTypes.array.isRequired,
    tableId: PropTypes.string,
    customerId: PropTypes.string
  }
  componentDidMount() {
    const { dispatch, tableId, customerId } = this.props; 
    dispatch(fetchOpenedTicket(tableId, customerId))
    .then(action => dispatch(fetchOrderGroups(action.ticket)))
    .catch(err => console.log(err));
  }
  render() {
    return (
      <OrderGroupsWidget orderGroups={this.props.orderGroups} ></OrderGroupsWidget>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    orderGroups: state.orderGroups,
    tableId: ownProps.tableId,
    customerId: ownProps.customerId
  }
}

export default connect(mapStateToProps)(OrderGroups)