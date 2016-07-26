import React from 'react';
import { connect } from 'react-redux';

import Subject from 'material-ui/svg-icons/action/subject';
import Delete from 'material-ui/svg-icons/action/delete';
import { List, ListItem } from 'material-ui/list';
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

  getListItems(waypoints) {
    return waypoints.map(waypoint => {
      const iconStyle = {
        'display': 'none',
        'top': '10px',
        'right': '15px',
      }
      return <ListItem
              className='waypoint-item'
              id={waypoint.id}
              key={waypoint.id}
              leftIcon={icons[waypoint.data.type]}
              rightIconButton={<Delete color={grey600} style={iconStyle} className='waypoint-delete-icon' onClick={() => this.handleDelete(waypoint.id)} />}
              primaryText={waypoint.data.title}
            />
    });
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
    const waypoints = this.getWaypointsList();

		return (
      <div>
        {waypoints}
      </div>
		)
	}

}
export default connect()(Waypoint);