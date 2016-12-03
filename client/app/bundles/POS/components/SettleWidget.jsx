import React from 'react' 
import style from './SettleWidget.scss'
import { Link } from 'react-router'

const SettleWidget = ({ balance, ticket_id, currentTable, payment, updatePayment, submitClick }) => {
  let input = '';
  var discountCalc = 0,
    grandTotal = 0, 
    paymentTotal = 0,
    totalBalance = 0,
    changeDue = 0;
  let discount = payment.discount ? payment.discount : 0;
  let cash = payment.cash ? payment.cash : 0;
  let voucher = payment.voucher ? payment.voucher : 0;
  let creditCard = payment.creditCard ? payment.creditCard : 0;
  discountCalc = parseFloat(balance) * parseFloat(discount)/100;
  grandTotal = parseFloat(balance) - parseFloat(discountCalc);
  paymentTotal = parseFloat(cash) + parseFloat(voucher) + parseFloat(creditCard);
  totalBalance = (grandTotal - paymentTotal) > 0 ? (grandTotal - paymentTotal).toFixed(2) : 0;
  changeDue = (grandTotal - paymentTotal) < 0 ? (paymentTotal - grandTotal).toFixed(2) : 0;

  return (
    <div id='orderItems' className='col-sm-8 col-md-4'>
      <div className='panel panel-default'>
        <div className='panel-heading'>
          <p>Table: {currentTable.name}</p>
          <p>Ticket: {ticket_id}</p>
        </div>

        <div id='orderListBody' className='panel-body'>
          <div className={style.settleBody}>
            <p className='row'>
              <span className='pull-left'>Ticket Total:</span>
              <span className='pull-right'>{balance}</span>
            </p>
            <div className={style.payment}>
              <p className='row'>
                <span className='pull-left'>Discount {discount} %:</span>
                <span className='pull-right'>{discountCalc}</span>
              </p>
            </div>
            <p className='row'>
              <span className='pull-left'>Grand Total:</span>
              <span className='pull-right'>{grandTotal}</span>
            </p>
            <p className='row'>
              <span className='pull-left'>Payment Total:</span>
              <span className='pull-right'>{paymentTotal}</span>
            </p>
            <div className={style.payment}>
              <p className='row'>
                <span className='pull-left'>Cash:</span>
                <span className='pull-right'>{cash}</span>
              </p>
              <p className='row'>
                <span className='pull-left'>Voucher:</span>
                <span className='pull-right'>{voucher}</span>
              </p>
              <p className='row'>
                <span className='pull-left'>Credit Card:</span>
                <span className='pull-right'>{creditCard}</span>
              </p>
            </div>
          </div>
        </div>

        <div className='panel-footer'>
          <div className={style.balance}>
            <p className='row'>
              <span className='pull-left'>Balance:</span>
              <span className='pull-right'>{totalBalance}</span>
            </p>
            <p className='row'>
              <span className='pull-left'>Change Due:</span>
              <span className='pull-right'>{changeDue}</span>
            </p>
          </div>
          <div className='row'>
            <form className="form-inline">
              <input 
                placeholder="Input"
                autoFocus 
                type="number" 
                className="form-control" 
                ref={value => input = value}/>
              <button 
                className='btn btn-default pull-right' 
                onClick={() => updatePayment({ ...payment, discount: input.value })}>
                Discount
              </button>
            </form>
          </div>
          <div className='row'>
            <button 
              onClick={() => {
                const newCash = parseFloat(input.value) + parseFloat(cash);
                updatePayment({ ...payment, cash: newCash })
              }}
              className='btn btn-default'>
              Cash
            </button>
            <button
              onClick={() => {
                const newCreditCard = parseFloat(input.value) + parseFloat(creditCard);
                updatePayment({ ...payment, creditCard: newCreditCard })
              }}
              className='btn btn-default'>
              Credit Card
            </button>
            <button
              onClick={() => {
                const newVoucher = parseFloat(input.value) + parseFloat(voucher);
                updatePayment({ ...payment, voucher: newVoucher })
              }}
              className='btn btn-default'>
              Voucher
            </button>
          </div>
          <div className='row'>
            <Link 
              to={`/all_tables/${currentTable.id}/${ticket_id}`} 
              className='btn btn-danger'>
              Cancel
            </Link>
            <button
              onClick={() => submitClick(payment, ticket_id, totalBalance)}
              className='btn btn-warning pull-right'>
              Submit
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default SettleWidget