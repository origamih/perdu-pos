import { combineReducers } from 'redux';
import { ActionTypes } from '../actions/index'

function tables(tables = [], action) {
  switch (action.type) {
  case ActionTypes.GET_TABLES:
    return action.tables;
  default:
    return tables;
  }
}

// Reducer, equivalent to below code, key of returned object must match the state slice
// function posApp(state = {}, action) {
//   return { tables: tables(state.tables, action) }
// }

// Using combineReducers,  slices of state selected according to their keys
// Or state.'tables' must match 'tables' reducer 
const posApp = combineReducers({ tables });
export default posApp