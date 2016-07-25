//Actions
const ADD_TRIP = 'trippy/ADD_TRIP';

const ADD_WAYPOINT = 'trippy/waypoints/ADD_WAYPOINT';
const DELETE_WAYPOINT = 'trippy/waypoints/DELETE_WAYPOINT';

//Initial State
const initialState = [];

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_TRIP: {
      let waypointsById = action.trip.waypointsById;
      waypointsById = waypointsById.length ? waypointsById : [];
      return waypointsById;
    }

    case ADD_WAYPOINT: {
      const waypointId = action.waypoint.id;
      return [...state, waypointId];
    }

    case DELETE_WAYPOINT: {
      const ids = [...state];
      const finalIds = ids.filter(id => id !== action.waypointId);
      return finalIds;
    }

    default: return state;
  }
}

