//Actions
const SHOW_MODAL = 'trippy/entry/ui/SHOW_MODAL';
const HIDE_MODAL = 'trippy/entry/ui/HIDE_MODAL';

//Initial State
const initialState = {
  message: '',
  open: false
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_MODAL: {
      const message = action.message;
      return { ...state, message, open: true };
    }

    case HIDE_MODAL: {
      return { ...state, open: false };
    }

    default: return state;
  }
}

// Action Creators
export function showMODAL(message) {
  return {
    type: SHOW_MODAL,
    message,
  };
}

export function hideMODAL() {
  return {
    type: HIDE_MODAL
  };
}


