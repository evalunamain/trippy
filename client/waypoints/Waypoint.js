import React from 'react';
import { connect } from 'react-redux';

import Subject from 'material-ui/svg-icons/action/subject';

import { ListItem } from 'material-ui/list';
import Delete from 'material-ui/svg-icons/action/delete';
import { grey600 } from 'material-ui/styles/colors';
import { deleteWaypoint } from '../ducks/waypointsDuck';

import { WAYPOINT_TYPES } from '../constants';

const icons = {
  1: < Subject />,
};

class Waypoint extends React.Component {
  handleDelete(waypointId) {
    const { dispatch } = this.props;
    dispatch(deleteWaypoint(waypointId));
  }

  render() {
    const type = this.props.data.type;
    const iconStyle = {
      'display': 'none',
      'top': '10px',
      'right': '15px',
    };
    const rightIconButton = <Delete color={grey600} style={iconStyle} className='waypoint-delete-icon' onClick={() => this.handleDelete(this.props.id)} />;
    let newProps = {
      ...this.props,
      primaryText: this.props.data.title,
      primaryTogglesNestedList: type === WAYPOINT_TYPES.STAGE ? true : false
    };
    if (!this.props.nestedItems.length) newProps.rightIconButton = rightIconButton;
    const icon = icons[this.props.data.type];
    if (icon) newProps.leftIcon = icon;

    return (
      <ListItem className='waypoint' {...newProps} />
    );
  }

}
export default connect()(Waypoint);
