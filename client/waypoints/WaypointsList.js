import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as waypointActions  from '../ducks/waypointsDuck';
import { setDrawer } from '../ducks/ui/drawerDuck';

import { List, ListItem } from 'material-ui/list';
import ContentAdd from 'material-ui/svg-icons/content/add';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import Layers from 'material-ui/svg-icons/maps/layers';

import Waypoint from './Waypoint';
import { WAYPOINT_TYPES } from '../constants';

class WaypointsList extends React.Component {

  handleItemClick(e) {
    const drawer = e.currentTarget.id;
    this.props.setDrawer(drawer, 300, true);
  }

  getWaypoints() {
    const { waypoints, waypointsById } = this.props;
    if (!waypointsById || !waypointId.length) return null;

    let curNestedItems = [];
    let finalItems = waypointsById.reduce((prevWaypoints,waypointId) => {
      let waypoint = waypoints[waypointId];
      let nestedItems = (waypoint.data.type === WAYPOINT_TYPES.STAGE) ? curNestedItems : null;
      if (waypoint.data.type === WAYPOINT_TYPES.STAGE) curNestedItems = [];
      return <Waypoint nestedItems={nestedItems} {...waypoint} />
    }, []);
  }

  render() {
    const wayPoints = this.getWaypoints();

    return (
      <List style={{"paddingTop":"0px","paddingBottom":"0px"}}>
        {wayPoints}
        <ListItem
          leftIcon={<ContentAdd />}
          primaryText="Add Waypoint"
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              id="addNote"
              key={1}
              leftIcon={<EventNote />}
              primaryText="Note"
              onTouchTap={this.handleItemClick.bind(this)}
            />,
            <ListItem
              id="addStage"
              key={2}
              leftIcon={<Layers />}
              primaryText="Stage"
              onTouchTap={this.handleItemClick.bind(this)}
            />
          ]}
        />
      </List>
    );
  }
}

const mapStateToProps = state =>
  Object.assign({}, { waypoints: state.waypoints, waypointsById: state.waypointsById });

const mapDispatchToProps = dispatch => bindActionCreators({ ...waypointActions, setDrawer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList);
