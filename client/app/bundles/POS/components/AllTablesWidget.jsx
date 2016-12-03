import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const AllTablesWidget = ({ tables, onClick, shouldRedirect }) => {
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
      return <button 
        data-dismiss="modal"
        key={table.id}
        onClick={() => onClick(table, shouldRedirect)}
        className={`btn btn-${status}`}>
        {table.name}
      </button>
    });
  }

  return (
    <div>{tableLinks}</div>
  );
}

AllTablesWidget.propTypes = { tables: PropTypes.array.isRequired }

export default AllTablesWidget