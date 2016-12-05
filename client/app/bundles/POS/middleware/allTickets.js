import * as actions from '../actions/index'
import { getTicketsByParams } from '../middleware/api'
import moment from 'moment'

export function startDateChange(date) {
  return (dispatch, getState) => {
    const endDate = getState().endDate;
    dispatch(actions.getStartDate(date));
    getTicketsByParams({ start_date: date, end_date: endDate })
    .then(tickets => dispatch(actions.getAllTickets(tickets)));
  }
}

export function endDateChange(date) {
  return (dispatch, getState) => {
    const startDate = getState().startDate;
    dispatch(actions.getEndDate(date));
    getTicketsByParams({ start_date: startDate, end_date: date })
    .then(tickets => dispatch(actions.getAllTickets(tickets)));
  }
}

export function ticketNumberChange(value) {
  return
}

export function startDateBack() {
  return (dispatch, getState) => {
    const startDate = moment(getState().startDate);
    const yesterday = startDate.subtract(1, 'days').toDate();
    dispatch(startDateChange(yesterday));
  }
}

export function startDateNext() {
  return (dispatch, getState) => {
    const startDate = moment(getState().startDate);
    const tomorrow = startDate.add(1, 'days').toDate();
    dispatch(startDateChange(tomorrow));
  }
}

export function endDateBack() {
  return (dispatch, getState) => {
    const endDate = moment(getState().endDate);
    const yesterday = endDate.subtract(1, 'days').toDate();
    dispatch(endDateChange(yesterday));
  }
}

export function endDateNext() {
  return (dispatch, getState) => {
    const endDate = moment(getState().endDate);
    const tomorrow = endDate.add(1, 'days').toDate();
    dispatch(endDateChange(tomorrow));
  }
}