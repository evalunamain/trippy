import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Paper from 'material-ui/Paper';

import * as entryActions from '../ducks/ui/entryDuck';
import { createTrip } from '../ducks/tripDuck';
import CreateTrip from './CreateTrip';
import JoinTrip from './JoinTrip';

class Entry extends React.Component {
  render() {
    return (
      <div className="trip-index-container">
        <div className="trip-index">
          <div className="trip-logo">
            <h1 className="trip-logo-header">Trippy</h1>
            <h6 className="trip-logo-subheader">Your plans. One place.</h6>
          </div>
          <div className="trip-start">
            < CreateTrip { ...this.props } />
            < JoinTrip { ...this.props } />
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => Object.assign({}, { ...state.ui.entry });

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...entryActions, createTrip }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Entry);
