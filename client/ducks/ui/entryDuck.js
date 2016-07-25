//Actions
const TOGGLE_CREATE_FORM = 'trippy/entry/ui/TOGGLE_CREATE_FORM';
const TOGGLE_JOIN_FORM = 'trippy/entry/ui/TOGGLE_JOIN_FORM';

//Initial State
const initialState = {
  createState: {
    editing: false,
  },
  joinState: {
    editing: false,
  },
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case TOGGLE_CREATE_FORM: {
      const editing = action.editing;
      const createState = {...state.createState, editing: editing };
      const joinState = {...state.joinState, editing: false };
      return { ...state, createState, joinState };
    }

    case TOGGLE_JOIN_FORM: {
      const editing = action.editing;
      const createState = {...state.createState, editing: false };
      const joinState = {...state.joinState, editing: editing };
      return { ...state, createState, joinState };
    }

    default: return state;
  }
}

// Action Creators
export function toggleCreateState(editing) {
  return {
    type: TOGGLE_CREATE_FORM,
    editing,
  };
}


export function toggleJoinState(editing) {
  return {
    type: TOGGLE_JOIN_FORM,
    editing,
  };
}

