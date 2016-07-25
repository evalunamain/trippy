import React from 'react';
import Snackbar  from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as snackBarActions from '../ducks/ui/snackbarDuck';

class TripSnackbar extends React.Component {
  handleRequestClose() {
    this.props.hideSnackbar();
  }

	render() {
		return (
      <Snackbar
        open={this.props.open}
        message={this.props.message}
        autoHideDuration={3000}
        onRequestClose={() => this.handleRequestClose() }
      />
    )
	}
}

const mapStateToProps = state => Object.assign({}, { ...state.ui.snackbar });

const mapDispatchToProps = dispatch => bindActionCreators(snackBarActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TripSnackbar);

