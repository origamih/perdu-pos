import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchOpenedTicket } from '../middleware/api'
import { ticketClick, mergeTickets } from '../middleware/buttonClickHandlers'
import TicketsWidget from '../components/TicketsWidget'
import * as actions from '../actions/index'
import { push } from 'react-router-redux'

export class Tickets extends Component {
  static propTypes = { 
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    clickedTickets: PropTypes.array.isRequired
  }
  componentWillMount() {
    const { dispatch, params } = this.props;
    const { table_id, customer_id } = params;
    dispatch(actions.requestTickets());
    dispatch(fetchOpenedTicket(table_id || null, customer_id || null))
    .then(action => {
      if(action.ticket.length == 1) {
        dispatch(push(`/all_tables/${params.table_id}/${action.ticket[0].id}`));
      }
      if(action.ticket.length == 0) {
        dispatch(push(`/all_tables/${params.table_id}/0`));
      }
      if(action.ticket.length > 1) {
        dispatch(actions.receiveTickets());
      }
    });
  }

  componentWillUnmount() {
    const { clickedTickets, dispatch } = this.props;
    // set requestTickets and currentTicket to default so that 
    // when redirect to Order from TicketsWidget it won't render the previous state
    dispatch(actions.requestTickets());
    dispatch(actions.getCurrentTicket({}));
    clickedTickets.map(ticket => {
      dispatch(actions.ticketClick(ticket));
    });
  }

  render() {
    const { tickets, clickedTickets, dispatch, receiveTickets } = this.props;
    const child = () => {
      {
        if(!receiveTickets) {
          return <h2></h2>
        }
        return <TicketsWidget 
          tickets={tickets} 
          clickedTickets={clickedTickets}
          ticketClick={ticket => dispatch(ticketClick(ticket))}
          mergeTickets={clickedTickets => dispatch(mergeTickets(clickedTickets))}>
        </TicketsWidget>;
      }
    }
    
    return (
      <div className='row' id='orderBody'>{child()}</div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return {
    params: ownProps.params,
    tickets: state.openedTicket,
    clickedTickets: state.clickedTickets,
    receiveTickets: state.receiveTickets
  }
}
export default connect(mapStateToProps)(Tickets);