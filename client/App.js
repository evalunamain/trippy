import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {teal500, teal700, red500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

class Main extends React.Component {
  constructor(props) {
    super(props);
    injectTapEventPlugin();
  }

  render() {
    return (
    <MuiThemeProvider>
      {this.props.children}
    </MuiThemeProvider>
    );
  }
}

export default connect()(Main);

// {React.cloneElement(this.props.children, this.props)}
