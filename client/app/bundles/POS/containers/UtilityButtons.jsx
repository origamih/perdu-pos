import React, { Component } from 'react';
import { getUtilityButtons } from '../actions/index'
import UtilityButtonsWidget from '../components/UtilityButtonsWidget'
import { connect } from 'react-redux'
import utilityButtonClick from '../middleware/utilityButtons'

export class UtilityButtons extends Component {
  componentDidMount() {
    this.props.dispatch(getUtilityButtons())
  }
  render() {
    return (
      <UtilityButtonsWidget 
        utilityButtons={this.props.utilityButtons} 
        onClick={(button) => this.props.dispatch(utilityButtonClick(button))}>
      </UtilityButtonsWidget>
    );
  }
}

function mapStateToProps(state) {
  return { utilityButtons: state.utilityButtons }
}

export default connect(mapStateToProps)(UtilityButtons)