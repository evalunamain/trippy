//Actions
const SHOW_SNACKBAR = 'trippy/entry/ui/SHOW_SNACKBAR';
const HIDE_SNACKBAR = 'trippy/entry/ui/HIDE_SNACKBAR';

//Initial State
const initialState = {
  message: '',
  open: false
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW_SNACKBAR: {
      const message = action.message;
      return { ...state, message, open: true };
    }

    case HIDE_SNACKBAR: {
      return { ...state, open: false };
    }

    default: return state;
  }
}

// Action Creators
export function showSnackbar(message) {
  return {
    type: SHOW_SNACKBAR,
    message,
  };
}

export function hideSnackbar() {
  return {
    type: HIDE_SNACKBAR
  };
}


