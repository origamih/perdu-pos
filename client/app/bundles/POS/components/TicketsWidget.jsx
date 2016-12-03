import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import style from './TicketsWidget.scss'

const TicketsWidget = ({ tickets, ticketClick, clickedTickets, mergeTickets, currentTable }) => {
  const button = () => {
    if(clickedTickets.length === 0) {
      return
    }
    if(clickedTickets.length === 1) {
      const { id, table_id, customer_id } = clickedTickets[0];
      if(table_id) {
        return <Link className='btn btn-default' to={`/all_tables/${table_id}/${id}`}>Select</Link>
      }
    }
    if(clickedTickets.length > 1) {
      return <button className='btn btn-default' onClick={() => mergeTickets(clickedTickets, currentTable)}>Merge Tickets</button>
    }
  }

  return (
    <div id='orderItems' className='col-sm-8 col-md-4'>
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <p>Table: {currentTable.name}</p>
        </div>

        <ul id='orderListBody' className='panel-body'>
          {
            tickets.map((ticket,id) => {
              let clicked = false;
              clickedTickets.forEach(clickedTicket => {
                if(clickedTicket === ticket) {
                  clicked = true;
                  return
                }
              });
              let liStyle = clicked ? { backgroundColor: 'rgba(0, 123, 255, 0.33)' } : {}
              return (
                <li key={id} className={style.li} style={liStyle}>
                  <a href="#" 
                    onClick={e => {
                      e.preventDefault();
                      ticketClick(ticket);
                    }}
                    className={style.a}>
                    <span>Ticket: {ticket.id}</span>
                  </a>
                </li>
              )
            })
          }
        </ul>

        <div className='panel-footer'>
          <Link to="/home/all_tables" className='btn btn-danger'>Close</Link>
          {button()}
        </div>
        
      </div>
    </div>
  );
}

TicketsWidget.propTypes = { 
  tickets: PropTypes.array.isRequired,
  ticketClick: PropTypes.func.isRequired,
  clickedTickets: PropTypes.array.isRequired
}
export default TicketsWidget