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
    this.props.setDrawer(drawer,300,true);
  }

  getWaypoints() {
    let waypoints = this.props.waypointsById;
    waypoints = waypoints ?
                waypoints.map(waypointId => this.props.waypoints[waypointId])
                : [];
    let waypointGroups = [];
    let group = [];

    let inStage;
    waypoints.forEach((waypoint) => {
      if (waypoint.data.type === WAYPOINT_TYPES.STAGE) {
        if (group.length) {
          waypointGroups.push(group);
        }
        group = [waypoint];
      } else {
        group.push(waypoint);
      }
    });

    if (group.length) waypointGroups.push(group);

    waypointGroups = waypointGroups.map((group) => {
      let newProps = {
        waypoints: group,
      }
      return < Waypoint {...newProps} />;
    });

    return waypointGroups || '';
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
