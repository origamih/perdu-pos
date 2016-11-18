import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AllTablesWidget = ({ tables }) => {
  if(tables instanceof Array){
    var tableLinks = tables.map(function(table) {
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
    });
  }

  return (
    <div>{tableLinks}</div>
  );
}

AllTablesWidget.propTypes = { tables: PropTypes.array.isRequired }

export default AllTablesWidget