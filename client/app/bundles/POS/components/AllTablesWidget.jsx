import React from 'react';
import { Link } from 'react-router';

export default class AllTablesWidget extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTables;
  }

  render() {
    var tables = this.props.tables.map(function(table) {
      var status = '';
      switch(table.status) {
      case 'available':
        status = 'default';
        break;
      case 'occupied':
        status = 'warning';
        break;
      case 'bill_printed':
        status = 'danger';
        break;
      }
      return <Link to={`/all_tables/${table.id}`} key={table.id} className={`btn btn-${status}`}>{table.name}</Link>
    })
    return (
      <div>{tables}</div>
    );
  }
}
