import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchOrderGroups } from '../middleware/api'
import OrderGroupsWidget from '../components/OrderGroupsWidget'

export class OrderGroups extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    orderGroups: PropTypes.array.isRequired,
    tableId: PropTypes.string,
    customerId: PropTypes.string
  }
  componentDidMount() {
    const { dispatch, ticketId } = this.props; 
    dispatch(fetchOrderGroups(ticketId));
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.ticketId !== this.props.ticketId) {
      const { dispatch, ticketId } = nextProps; 
      dispatch(fetchOrderGroups(ticketId));
    }
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
    ticketId: ownProps.ticketId
  }
}

export default connect(mapStateToProps)(OrderGroups)