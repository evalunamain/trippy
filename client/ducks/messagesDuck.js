
import { browserHistory } from 'react-router';
import { omit } from 'lodash';

//Actions
const ADD_TRIP = 'trippy/ADD_TRIP';

const ADD_MESSAGE = 'trippy/messages/ADD_MESSAGE';
const SEND_MESSAGE = 'trippy/messages/SEND_MESSAGE';

//Initial State
const initialState = [];

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_MESSAGE : {
      const content = action.content;
      const author = action.author;
      const timestamp = action.timestamp;
      const id = action.id;
      const msg = { content, author, timestamp, id };
      return [...state, msg];
    }

    case SEND_MESSAGE : {
      const content = action.content;
      const author = action.author;
      const timestamp = action.timestamp;
      const id = action.id;
      const msg = { content, author, timestamp, id };
      return [...state, msg];
    }

    case ADD_TRIP : {
      const messages = action.trip.messages;
      return [...state, ...messages];
    }

    default: return state;
  }
}

// Action Creators 
export function addMessage(msg) {
  return {
    type: ADD_MESSAGE,
    id: msg.id,
    author: msg.author,
    content: msg.content,
    timestamp: msg.timestamp,
  };
}

export function sendMessage(msg) {
  return (dispatch, getState) => {
    dispatch(addMessage(msg));
    let tripId = getState().trip.id;
    fetch(`/api/trips/${tripId}/messages`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msg),
    })
      .catch(error => { throw error; });
  };
}
