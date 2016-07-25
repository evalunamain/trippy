import React from 'react';
import Subject from 'material-ui/svg-icons/action/subject';
import { List, ListItem } from 'material-ui/list';

import { WAYPOINT_TYPES } from '../constants';

const icons = {
  1: < Subject />
}

class Waypoint extends React.Component {
  getListItems(waypoints) {
    return waypoints.map(waypoint => {
      return <ListItem
              id={waypoint.id}
              key={waypoint.id}
              leftIcon={icons[waypoint.data.type]}
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


export default Waypoint;