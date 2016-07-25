import WaypointsDrawer from '../../trip/drawers/WaypointsDrawer';

//Actions
const TOGGLE_DRAWER = 'trippy/ui/TOGGLE_DRAWER';
const SET_DRAWER = 'trippy/ui/SET_DRAWER';
const SET_DRAWER_CHILD_PROPS = 'trippy/ui/SET_DRAWER_CHILD_PROPS';

//Initial State
const initialState = {
  open: false,
  width: 300,
  drawer: 'waypoints',
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_DRAWER: {
      const width = action.width;
      const drawer = action.drawer;
      const open = action.open;
      return { ...state, width, drawer, open};
    }

    case TOGGLE_DRAWER: {
      const isOpen = state.open;
      return { ...state, open: !isOpen };
    }

    default: return state;
  }
}

// Action Creators
export function setDrawer(drawer, width, open) {
  return {
    type: SET_DRAWER,
    open,
    width,
    drawer,
  };
};

export function toggleDrawer() {
  return {
    type: TOGGLE_DRAWER,
  };
}
