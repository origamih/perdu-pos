import React, { Component } from 'react';
import AllTicketsWidget from '../components/AllTicketsWidget'
import { getTicketsByParams } from '../middleware/api'
import { connect } from 'react-redux'
import * as actions from '../actions/index'
import * as middleware from '../middleware/allTickets'

export class AllTickets extends Component {
  componentDidMount() {
    const { startDate, endDate, dispatch } = this.props;
    getTicketsByParams({ start_date: startDate, end_date: endDate })
    .then(tickets => dispatch(actions.getAllTickets(tickets)));
  }

  render() {
    const { filterValue, tickets, startDate, endDate, ticketNumber, dispatch } = this.props;
    return (
      <AllTicketsWidget
        startDateBack={() => dispatch(middleware.startDateBack())} 
        startDateNext={() => dispatch(middleware.startDateNext())}
        endDateBack={() => dispatch(middleware.endDateBack())} 
        endDateNext={() => dispatch(middleware.endDateNext())}
        filterValue={filterValue}
        startDateChange={date => dispatch(middleware.startDateChange(date))}
        endDateChange={date => dispatch(middleware.endDateChange(date))}
        filterChange={value => dispatch(actions.getFilterValue(value))}
        ticketNumberChange={value => dispatch(middleware.ticketNumberChange(value))}
        ticketNumber={ticketNumber}
        endDate={endDate}
        tickets={tickets} 
        startDate={startDate}>
      </AllTicketsWidget>
    );
  }
}

function mapStateToProps(state) {
  const filterValue = state.filterValue;
  let tickets = [];
  if(filterValue == 0) {
    tickets = state.allTickets;
  }
  if(filterValue == 1) {
    tickets = state.allTickets.filter(ticket => ticket.is_open);
  }
  if(filterValue == 2) {
    tickets = state.allTickets.filter(ticket => !ticket.is_open);
  }
  if(filterValue == 3) {
    tickets = [];
  }
  return {
    startDate: state.startDate,
    endDate: state.endDate,
    ticketNumber: state.ticketNumber,
    tickets,
    filterValue: state.filterValue
  }
}

export default connect(mapStateToProps)(AllTickets)