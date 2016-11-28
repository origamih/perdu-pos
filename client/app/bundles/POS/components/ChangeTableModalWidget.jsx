import React, { Component } from 'react';
import style from './ChangeTableModalWidget.scss'
import AllTables from '../containers/AllTables'

export default class ChangeTableModal extends Component {
  render() {
    return (
      <div className={style.modal}>
        <div className="modal" id='tableModal' role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modal title</h4>
              </div>
              <div className="modal-body">
                <AllTables></AllTables>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
