import React from 'react';
import { List, ListItem } from 'material-ui/list';
import Drawer from 'material-ui/Drawer';
import ContentAdd from 'material-ui/svg-icons/content/add';
import WaypointsList from '../../waypoints/WaypointsList';
import WaypointsDrawerHeader from './WaypointsDrawerHeader';

class WaypointsDrawer extends React.Component {

  handleToggle() {
    this.setState({ open: !this.state.open });
  }

  setWaypointsDrawerChildren (children) {
    this.setState({ children });
  }

  render() {
    return (
       <Drawer width={this.props.width} openSecondary={true} open={this.props.open} >
        <WaypointsDrawerHeader />
        <WaypointsList />
      </Drawer>
    );
  }
}

export default WaypointsDrawer;
