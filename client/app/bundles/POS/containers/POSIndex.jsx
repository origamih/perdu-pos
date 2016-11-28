import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCurrentUser } from '../actions/index'
import POSIndexWidget from '../components/POSIndexWidget'

export class POSIndex extends Component {
  componentDidMount() {
    this.props.dispatch(getCurrentUser(this.props.user));
  }
  render() {
    return (
      <POSIndexWidget children={this.props.children}></POSIndexWidget>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: ownProps.route.user,
    children: ownProps.children
  }
}

export default connect(mapStateToProps)(POSIndex)