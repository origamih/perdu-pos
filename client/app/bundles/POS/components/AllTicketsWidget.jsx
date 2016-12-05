import React from 'react'
import DatePicker from 'react-toolbox/lib/date_picker'
import style from './AllTicketsWidget.scss'
import { Link } from 'react-router'

const AllTicketsWidget = ({ tickets, startDate, endDate, startDateChange, 
  endDateChange, filterChange, filterValue, ticketNumberChange,
  startDateBack, startDateNext, endDateBack, endDateNext }) => {
  let totalBalance = 0;
  return (
    <div className={style.body}>
      <div className='row'>
        <div className='col-md-3'>
          <DatePicker label='Start Date' value={startDate} autoOk={true}
          onChange={(value) => startDateChange(value)}/>
        </div>
        <div className={`col-md-1 ${style.buttons}`}>
          <button className='btn btn-default' onClick={startDateBack}>{`<<`}</button>
          <button className='btn btn-default' onClick={startDateNext}>>></button>
        </div>
        <div className='col-md-3'>
          <DatePicker label='End Date' value={endDate} autoOk={true}
          onChange={(value) => endDateChange(value)}/>
        </div>
        <div className={`col-md-1 ${style.buttons}`}>
          <button className='btn btn-default' onClick={endDateBack}>{`<<`}</button>
          <button className='btn btn-default' onClick={endDateNext}>>></button>
        </div>
      </div>
      <div className={`row ${style.rows}`}>
        <div className='col-md-4'>
          <select className="form-control" onChange={(e) => filterChange(e.target.value)}>
            <option value="0">All Tickets</option>
            <option value="1">Open Tickets</option>
            <option value="2">Closed Tickets</option>
            {/*<option value="3">Ticket Number</option>*/}
          </select>
        </div>
        {/*<div className='col-md-4'>
                  <input type="number" placeholder='Ticket Number' onChange={e => ticketNumberChange(e.target.value)}
                  className='form-control' disabled={filterValue == 3 ? false : true}/>
                </div>*/}
      </div>
      <div className={`row ${style.table}`}>
        <div className='col-md-12'>
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Number</th>
                <th>Table</th>
                <th>Time</th>
                <th>Status</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => {
                totalBalance += ticket.balance;
                return (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.table.name}</td>
                    <td>{new Date(ticket.created_at).toLocaleString()}</td>
                    <td>{ticket.is_open ? 'Unpaid' : 'Paid'}</td>
                    <td>{ticket.balance}</td>
                    <td>
                      <Link className='btn btn-default' 
                        to={`/all_tables/${ticket.table.id}/${ticket.id}`}>
                        Display
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-1 pull-right'>
          <label htmlFor="">Total: {totalBalance}</label>
        </div>
      </div>
    </div>
  );
}

export default AllTicketsWidget