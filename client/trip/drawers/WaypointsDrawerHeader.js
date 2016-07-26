import React from 'react';
import { connect } from 'react-redux';
import { toggleDrawer } from '../../ducks/ui/drawerDuck';

class WaypointsDrawerHeader extends React.Component {
  handleWaypointsHeaderClick() {
    const { dispatch } = this.props;
    dispatch(toggleDrawer());
  }

  render() {
    return (
      <div className="waypoints-drawer-toolbar"
            onClick={() => this.handleWaypointsHeaderClick() } >
        <h2>Waypoints</h2>
      </div>
    );
  }
};

const mapStateToProps = state => Object.assign({}, { ...state.ui.drawer })

export default connect()(WaypointsDrawerHeader);
