import { connect } from 'react-redux';
import AllTablesWidget from '../components/AllTablesWidget.jsx';
import { fetchTables } from '../middleware/api'
import React, { Component } from 'react';
import { tableClick } from '../middleware/buttonClickHandlers'

export class AllTables extends Component {
  static propTypes = { 
    tables: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
  }
  constructor(props)
  {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchTables());
  }
  render() {
    const { tables, dispatch, shouldRedirect } = this.props;
    return (
      <AllTablesWidget 
      shouldRedirect={shouldRedirect}
      tables={tables} 
      onClick={(table, shouldRedirect) => dispatch(tableClick(table, shouldRedirect))}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { 
    tables: state.tables,
    shouldRedirect: ownProps.route.shouldRedirect
  }
}
export default connect(mapStateToProps)(AllTables);