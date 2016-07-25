import React from 'react';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { isEqual, omit } from 'lodash';
import { saveWaypoint } from '../../ducks/waypointsDuck';
import { setDrawer } from '../../ducks/ui/drawerDuck';

import Drawer from 'material-ui/Drawer';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import TextField from 'material-ui/TextField';
import { blueGrey500 } from 'material-ui/styles/colors';

import WaypointsDrawerHeader from './WaypointsDrawerHeader';
import { WAYPOINT_TYPES } from '../../constants';

class AddNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const propsChanged = (!isEqual(nextProps, this.props));
    const somethingBesidesFormValuesChanged = (
      !isEqual(_.omit(nextState, ['title', 'body']), _.omit(this.state, ['title', 'body']))
    );
    return (propsChanged || somethingBesidesFormValuesChanged);
  }

  handleTitleChange(e, title) {
    this.setState({ title: title });
  }

  handleBodyChange(e, body) {
    this.setState({ body: body });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;

    const socket = this.context.socket;

    const title = this.state.title;
    const body = this.state.body;
    if (!(title && body)) return;
    const waypoint = {
      id: uuid.v4(),
      data: {
        type: WAYPOINT_TYPES.NOTE,
        title: title,
        body: body,
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
        <WaypointsDrawerHeader
          setSecondaryDrawer={this.props.setSecondaryDrawer}
         />
        <form className="waypoint-form" onSubmit={(e) => this.handleSubmit(e) }>
          <div className="waypoint-header-wrapper">
            < NoteAdd color={blueGrey500} style={iconStyle} />
            <h3 className="waypoint-header">Add Note</h3>
          </div>
          <TextField
            id="note"
            fullWidth={true}
            hintText="Title"
            autoFocus={true}
            onChange={this.handleTitleChange.bind(this)} />
          <TextField
            fullWidth={true}
            hintText="Body"
            id="body"
            multiLine={true}
            onKeyDown={(e) => { if (e.keyCode === 13) { this.handleSubmit(e) }}}
            onChange={this.handleBodyChange.bind(this)} />
        </form>
      </Drawer>
    );
  }
}

AddNote.contextTypes = {
  socket: React.PropTypes.object,
}

const mapStateToProps = state => Object.assign({}, { author: state.author });

export default connect(mapStateToProps)(AddNote);
