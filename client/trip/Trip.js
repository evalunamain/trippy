import React from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import { findKey } from 'lodash';
import * as authorActions from '../ducks/authorDuck';
import * as tripActions from '../ducks/tripDuck';
import * as drawerActions from '../ducks/ui/drawerDuck';
import * as waypointActions from '../ducks/waypointsDuck';
import { showSnackbar } from '../ducks/ui/snackbarDuck';
import tripUiInitialState from './tripUiInitialState';

import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import DirectionsRun from 'material-ui/svg-icons/maps/directions-run';

import EnterAuthorModal from './dialogs/EnterAuthorModal';
import ChatContainer from '../chat/ChatContainer';
import MapsContainer from '../maps/MapsContainer';
import CurrentAuthors from './CurrentAuthors'
import TripSnackbar from './TripSnackbar';
import WaypointsDrawer from './drawers/WaypointsDrawer';
import AddStageDrawer from './drawers/AddStageDrawer';
import AddNoteDrawer from './drawers/AddNoteDrawer';
import Map from '../maps/Map';

const socket = io('', { path: '/api/chat' });

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...tripUiInitialState };
  }

  componentWillMount() {
    this.fetchTripIfNeeded();
    socket.on('new waypoint', waypoint => {
      const authorName = this.props.currentAuthors[waypoint.data.author].name;
      this.props.addWaypoint(waypoint);
      this.props.showSnackbar(`${authorName} added a new waypoint!`);
    });

    socket.on('author left', authorId => {
      this.props.removeAuthor(authorId);
    });

    socket.on('author typing', authorId => {
      this.props.setAuthorTyping(authorId, true);
    });

    socket.on('author stop typing', authorId => {
      this.props.setAuthorTyping(authorId, false);
    });

    socket.on('current authors', currentAuthors => {
      this.props.receiveCurrentAuthors(currentAuthors);
    });

    socket.on('new author', author => {
      this.props.addNewAuthor(author);
    });
  }

  componentDidMount() {
    socket.emit('trip mounted', this.props.params.tripId);
  }

  componentWillUnmount() {
    if (this.props.author) {
      socket.disconnect();
    }
  }

   getChildContext() {
    return {
      socket: socket,
    };
  }

  getDrawerComponent(drawer) {
    let drawerComponent;
    let newProps = {
        ...this.props.ui.drawer,
    };
    switch (drawer) {
      case 'waypoints': {
        newProps = { ...newProps, waypoints:this.props.waypoints, waypointsById:this.props.waypointsById}
        drawerComponent = <WaypointsDrawer {...newProps} />;
        break;
      }
      case 'addStage': {
        drawerComponent = <AddStageDrawer {...newProps} />
        break;
      }
      case 'addNote': {
        drawerComponent = <AddNoteDrawer {...newProps} />
        break;
      }
      default: {
        drawerComponent = <WaypointsDrawer {...newProps} />;
      }
    };

    return drawerComponent;
  }

  handleWaypointsIconClick() {
    this.props.setDrawer('waypoints',300,true);
  }

  fetchTripIfNeeded() {
    if (!this.props.initialized) {
      let tripId = this.props.params.tripId;
      this.props.fetchTrip(tripId);
    }
  }

  authorDialogNeeded() {
    return (!this.props.author || !this.props.author.name);
  }

  render() {
    const backgroundMapStyle = {
      'position': 'absolute',
      'top': '0px',
      'left': '0px',
      'width': '100vw',
      'height': '100vh',
    };
    return (
      <div ref="trip">
        {this.getDrawerComponent(this.props.ui.drawer.drawer)}
        <MapsContainer style={backgroundMapStyle} />
        <ChatContainer 
          messages={this.props.messages}
          author={this.props.author} 
          sendMessage={this.props.sendMessage}
          addMessage={this.props.addMessage}
          socket={socket}
        />
        <CurrentAuthors />
        <IconButton tooltip="Waypoints" onClick={this.handleWaypointsIconClick.bind(this)} style={{ "position":"absolute", "top":"16px", "right":"60px" }}>
          <DirectionsRun />
        </IconButton>
        < TripSnackbar />
        < EnterAuthorModal socket={socket} open={this.authorDialogNeeded()} />
      </div>
    );
  }

}

Trip.childContextTypes = {
  socket: React.PropTypes.object,
};

const mapStateToProps = state => Object.assign({}, { ...state.trip, ui: state.ui });

const mapDispatchToProps = dispatch => 
  bindActionCreators({ ...authorActions, ...tripActions, ...drawerActions, ...waypointActions, showSnackbar }, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Trip);
