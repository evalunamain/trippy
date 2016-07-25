import { combineReducers } from 'redux';
import { browserHistory } from 'react-router';
import { omit } from 'lodash';

//Actions
const ADD_TRIP = 'trippy/ADD_TRIP';
const FETCHING_TRIP = 'trippy/FETCHING_TRIP';
const MAKING_TRIP = 'trippy/MAKING_TRIP';

const ADD_NEW_AUTHOR = 'trippy/trip/ADD_NEW_AUTHOR';
const RECEIVE_CURRENT_AUTHORS = 'trippy/trip/RECEIVE_CURRENT_AUTHORS';
const REMOVE_AUTHOR = 'trippy/trip/REMOVE_AUTHOR';
const SET_AUTHOR = 'trippy/author/SET_AUTHOR';
const SET_AUTHOR_TYPING = 'trippy/trip/SET_AUTHOR_TYPING';

const ADD_MESSAGE = 'trippy/trip/ADD_MESSAGE';
const SEND_MESSAGE = 'trippy/trip/SEND_MESSAGE';

//Initial State
const initialState = {
  currentAuthors: {},
  id: '',
  title: '',
  initialized: false,
  loading: false,
};

// Reducer 
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_NEW_AUTHOR: {
      const name = action.author.name;
      const id = action.author.id;
      return {
        ...state,
        currentAuthors: { ...state.currentAuthors, [id]: { name, typing: false } },
      };
    }

    case RECEIVE_CURRENT_AUTHORS: {
      const currentAuthors = action.currentAuthors;
      return { ...state, currentAuthors };
    }
    case REMOVE_AUTHOR: {
      const authorId = action.authorId;
      return {
        ...state,
        currentAuthors: _.omit(state.currentAuthors, authorId),
      };
    }

    case SET_AUTHOR: {
      const name = action.author.name;
      const id = action.author.id;
      return {
        ...state,
        currentAuthors: { ...state.currentAuthors, [id]: { name, typing: false } },
      };
    }

    case SET_AUTHOR_TYPING: {
      const authorId = action.authorId;
      const typing = action.typing;
      return {
        ...state,
        currentAuthors: {
          ...state.currentAuthors,
          [authorId]: {
            ...state.currentAuthors[authorId],
            typing
          }
        }
      };
    }

    case FETCHING_TRIP: {
      const loading = action.loading;
      return { ...state, loading };
    }

    case MAKING_TRIP : {
      const loading = action.loading;
      return { ...state, loading };
    }

    case ADD_TRIP : {
      const id = action.trip.id;
      const title = action.trip.title;
      return { ...state, id, title, initialized: true, loading: false};
    }

    default: return state;
  }
}

// Action Creators 
export function addNewAuthor(author) {
  return {
    type: ADD_NEW_AUTHOR,
    author,
  };
}

export function createTrip(title) {
  return dispatch => {
    dispatch(makingTrip());
    fetch('/api/newtrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      }).then(response => response.json())
          .then(json => {
            let trip = json;
            dispatch(addTrip(trip));
            return trip;
          }).then(trip => browserHistory.push(trip.id));
  };
}

export function fetchTrip(tripId) {
  return dispatch => {
    dispatch(fetchingTrip());
    fetch(`/api/trips/${tripId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { tripId },
      }).then(response => response.json())
          .then(json => {
            let trip = json;
            console.log(trip);
            dispatch(addTrip(trip));
          });
  };
}

export function fetchingTrip() {
  return {
    type: FETCHING_TRIP,
    loading: true,
  };
}

export function makingTrip() {
  return {
    type: MAKING_TRIP,
    loading: true,
  };
}

export function addTrip(trip) {
  console.log(trip);
  return {
    type: ADD_TRIP,
    trip,
  };
}

export function receiveCurrentAuthors(currentAuthors) {
  return {
    type: RECEIVE_CURRENT_AUTHORS,
    currentAuthors,
  };
}

export function removeAuthor(authorId) {
  return {
    type: REMOVE_AUTHOR,
    authorId,
  };
}

export function setAuthorTyping(authorId, typing) {
  return {
    type: SET_AUTHOR_TYPING,
    authorId,
    typing,
  };
}

