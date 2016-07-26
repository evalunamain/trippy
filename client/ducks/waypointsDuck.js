//Actions
const ADD_TRIP = 'trippy/ADD_TRIP';

const ADD_WAYPOINT = 'trippy/waypoints/ADD_WAYPOINT';
const DELETE_WAYPOINT = 'trippy/waypoints/DELETE_WAYPOINT';

//Initial State
const initialState = {};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_TRIP: {
      let waypoints = action.trip.waypoints;
      waypoints = waypoints ? waypoints : {};
      return waypoints;
    }

    case ADD_WAYPOINT: {
      let waypoint = action.waypoint;
      let id = action.waypoint.id;
      return { ...state, [id]: waypoint };
    }

    case DELETE_WAYPOINT: {
      let waypoints = {...state};
      delete waypoints[action.waypointId]
      return waypoints;
    }

    default: return state;
  }
}

// Action Creators


// Action Creators
export function addWaypoint(waypoint) {
  return {
    type: ADD_WAYPOINT,
    waypoint,
  };
}

export function deleteWaypoint(waypointId) {
  return (dispatch, getState) => {
    let body = { waypointId };
    dispatch({ type: DELETE_WAYPOINT, waypointId });
    let tripId = getState().trip.id;
    fetch(`/api/trips/${tripId}/waypoints`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .catch(error => { throw error; });
  };
}


export function saveWaypoint(waypoint) {
  return (dispatch, getState) => {
    dispatch(addWaypoint(waypoint));
    let tripId = getState().trip.id;
    fetch(`/api/trips/${tripId}/waypoints`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(waypoint),
    })
      .catch(error => { throw error; });
  }
}
