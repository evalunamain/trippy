//Actions
const SET_AUTHOR = 'trippy/author/SET_AUTHOR';

//Initial State
const initialState = {
  id: null,
  name: null,
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_AUTHOR: {
    	const name = action.author.name;
      const id = action.author.id;
    	return {...state, name, id };
    }

    default: return state;
  }
}

// Action Creators

export function setAuthor(author) {
  return {
    type: SET_AUTHOR,
    author
  };
}

