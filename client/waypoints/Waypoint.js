import React from 'react';
import { connect } from 'react-redux';

import Subject from 'material-ui/svg-icons/action/subject';

import { ListItem } from 'material-ui/list';
import Delete from 'material-ui/svg-icons/action/delete';
import { grey600 } from 'material-ui/styles/colors';
import { deleteWaypoint } from '../ducks/waypointsDuck';

import { WAYPOINT_TYPES } from '../constants';

const icons = {
  1: < Subject />
}

class Waypoint extends React.Component {
  handleDelete(waypointId) {
    const { dispatch } = this.props;
    dispatch(deleteWaypoint(waypointId));
  }

  getWaypointsList() {
    const first = this.props.waypoints[0];
    const isStage = first.data.type === WAYPOINT_TYPES.STAGE;
    const isStageList = isStage && this.props.waypoints.length > 1;
    let waypoints;

    if (isStageList) {
      let nestedItems = this.getListItems(this.props.waypoints.slice(1));

      waypoints = <ListItem
        key={first.id}
        initiallyOpen={false}
        primaryTogglesNestedList={true}
        primaryText={first.data.title}
        nestedItems={nestedItems}
      />
    } else {
      waypoints = this.getListItems(this.props.waypoints);
    }

    return waypoints;

  }

  render() {
    const type = this.props.data.type;
    const iconStyle = {
      'display': 'none',
      'top': '10px',
      'right': '15px',
    };
    const rightIconButton = <Delete color={grey600} style={iconStyle} className='waypoint-delete-icon' onClick={() => this.handleDelete(waypoint.id)} />;
    let newProps = {
      ...this.props,
      rightIconButton,
      primaryTogglesNestedList: type === WAYPOINT_TYPES.STAGE ? true : false,
      nestedItems:

    };

    return (
      <ListItem className='waypoint'/>
    )
  }

}
export default connect()(Waypoint);
