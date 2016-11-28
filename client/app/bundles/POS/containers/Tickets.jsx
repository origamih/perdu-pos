import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchOpenedTicket } from '../middleware/api'
import { ticketClick } from '../middleware/buttonClickHandlers'
import TicketsWidget from '../components/TicketsWidget'
import Orders from '../containers/Orders'

export class Tickets extends Component {
  static propTypes = { 
    params: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    clickedTickets: PropTypes.array.isRequired
  }
  componentDidMount() {
    const { dispatch, params } = this.props;
    const { table_id, customer_id } = params;
    dispatch(fetchOpenedTicket(table_id || null, customer_id || null));
  }
  render() {
    const { tickets, clickedTickets, dispatch } = this.props;
    const child = () => {
      if(tickets.length > 1) {
        return <TicketsWidget 
          tickets={tickets} 
          clickedTickets={clickedTickets}
          ticketClick={ticket => dispatch(ticketClick(ticket))}>
        </TicketsWidget>;
      }
      else {
        let params = this.props.params;
        params.ticket_id = tickets[0] ? tickets[0].id : undefined;
        return <Orders params={params}></Orders>;
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
    clickedTickets: state.clickedTickets
  }
}
export default connect(mapStateToProps)(Tickets);