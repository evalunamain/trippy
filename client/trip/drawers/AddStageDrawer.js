import React from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { isEqual, omit } from 'lodash';
import { saveWaypoint } from '../../ducks/waypointsDuck';
import { setDrawer } from '../../ducks/ui/drawerDuck';

import BookMark from 'material-ui/svg-icons/action/bookmark-border';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import { blueGrey500 } from 'material-ui/styles/colors';

import WaypointsDrawerHeader from './WaypointsDrawerHeader';
import { WAYPOINT_TYPES } from '../../constants';

class AddStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: '' };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsChanged = (!isEqual(nextProps, this.props));
    const somethingBesidesFormValuesChanged = (
      !isEqual(_.omit(nextState, 'title'), _.omit(this.state, 'title'))
    );
    return (propsChanged || somethingBesidesFormValuesChanged);
  }

  handleChange(e, title) {
    this.setState({ title });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    const { socket } = this.context;

    const title = this.state.title;
    if (!title) return;
    const waypoint = {
      id: uuid.v4(),
      data: {
        type: WAYPOINT_TYPES.STAGE,
        title: title,
        author: this.props.author.id,
      }
    };
    socket.emit('new waypoint', waypoint);
    dispatch(saveWaypoint(waypoint));
    dispatch(setDrawer('waypoints',300,true));
  }


  render() {
    const iconStyle = {
      'flexShrink': '0',
      'margin': '0 5px 2px 0',
    }

    return (
      <Drawer width={this.props.width} openSecondary={true} open={this.props.open} >
        <WaypointsDrawerHeader />
        <form className="waypoint-form" onSubmit={(e) => this.handleSubmit(e) }>
          <div className="waypoint-header-wrapper">
            < BookMark color={blueGrey500} style={iconStyle} />
            <h3 className="waypoint-header">Add Stage</h3>
          </div>
          <TextField
            id="stageName"
            fullWidth={true}
            hintText="Enter a title"
            onChange={this.handleChange.bind(this)} />
        </form>
      </Drawer>
    );
  }
}

AddStage.contextTypes = {
  socket: React.PropTypes.object,
};

const mapStateToProps = state => Object.assign({}, { author: state.author });

export default connect(mapStateToProps)(AddStage);
