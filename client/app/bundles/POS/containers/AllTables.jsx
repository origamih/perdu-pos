import React from 'react';
import AllTablesWidget from '../components/AllTablesWidget';

export default class AllTables extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tables: [] };
  }
  componentDidMount() {
    // Get all tables
    $.get(
      '/tables',
      function(data) {
        this.setState({ tables: data });
      }.bind(this),
      'JSON'
    );
  }
  render() {
    return <AllTablesWidget tables={this.state.tables}/>;
  }
}
