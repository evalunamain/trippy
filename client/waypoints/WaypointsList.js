import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as waypointActions  from '../ducks/waypointsDuck';
import { setDrawer } from '../ducks/ui/drawerDuck';

import { List, ListItem } from 'material-ui/list';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
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
    if (!waypointsById || !waypointsById.length) return null;

    let curNestedItems = [];
    let finalItems = [];
    for (let i = waypointsById.length - 1; i >= 0; i--) {
      let waypointId = waypointsById[i];
      let waypoint = waypoints[waypointId];
      let nestedItems = (waypoint.data.type === WAYPOINT_TYPES.STAGE) ? curNestedItems : [];
      if (waypoint.data.type === WAYPOINT_TYPES.STAGE) {
        finalItems = [<Waypoint nestedItems={nestedItems} {...waypoint} />, ...finalItems ]
        curNestedItems = [];
      }
      else {
        curNestedItems = [<Waypoint nestedItems={[]} {...waypoint} />, ...curNestedItems];
      }
    }
    return [...curNestedItems,...finalItems];
  }

  render() {
    const wayPoints = this.getWaypoints();

    return (
      <List style={{"paddingTop":"0px","paddingBottom":"0px"}}>
        <ListItem
          leftIcon={<ContentAdd />}
          primaryText="Add Waypoint"
          initiallyOpen={false}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              id="addNote"
              key={1}
              leftIcon={<NoteAdd />}
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
        {wayPoints}
      </List>
    );
  }
}

const mapStateToProps = state =>
  Object.assign({}, { waypoints: state.waypoints, waypointsById: state.waypointsById });

const mapDispatchToProps = dispatch => bindActionCreators({ ...waypointActions, setDrawer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(WaypointsList);
