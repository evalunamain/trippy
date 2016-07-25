import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Drawer from 'material-ui/drawer';

class SecondaryDrawer extends React.Component {
  render() {
    return (
      <Drawer width={this.props.width} openSecondary={true} open={this.props.open} >
        {this.props.children}
      </Drawer>
    );
  }
}

export default SecondaryDrawer;
