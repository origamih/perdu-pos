import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchOpenedTicket, fetchOrderGroups } from '../middleware/index'
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
    .then(action => dispatch(fetchOrderGroups(action.ticket)));
  }

  render() {
    const { orderGroups, users } = this.props;
    return (
      <OrderGroupsWidget orderGroups={orderGroups} users={users} ></OrderGroupsWidget>
    );
  }

  componentWillUnmount() {
    this.props.dispatch(fetchOrderGroups(undefined));
  }
}

function mapStateToProps(state, ownProps) {
  const orderGroups = state.orderGroupIds.map(id => {
    return state.entities.orderGroups[id];
  });
  return {
    orderGroups,
    users: state.entities.users,
    tableId: ownProps.tableId,
    customerId: ownProps.customerId
  }
}

export default connect(mapStateToProps)(OrderGroups)