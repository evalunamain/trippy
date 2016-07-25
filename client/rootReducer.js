import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import trip from './ducks/tripDuck';
import messages from './ducks/messagesDuck';
import waypoints from './ducks/waypointsDuck';
import waypointsById from './ducks/waypointsByIdDuck';
import ui from './ducks/uiDuck';
import author from './ducks/authorDuck';

const rootReducer = combineReducers({
  trip,
  messages,
  waypoints,
  waypointsById,
  ui,
  author,
  routing: routerReducer,
});

export default rootReducer;
