import { connect } from 'react-redux';
import AllTablesWidget from '../components/AllTablesWidget';
import { fetchTables } from '../actions/index'
import React, { Component } from 'react';

class AllTables extends Component {
  static propTypes = { tables: React.PropTypes.array.isRequired }
  constructor(props)
  {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchTables());
  }
  render() {
    return (
      <AllTablesWidget tables={this.props.tables}/>
    );
  }
}

const mapStateToProps = (state) => {
  return { tables: state.tables }
}
export default connect(mapStateToProps)(AllTables);