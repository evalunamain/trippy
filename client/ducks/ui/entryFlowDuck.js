import { FLOW_STATES } from '../../constants';

//Actions
const SWITCH_ENTRY_FLOW = 'trippy/ui/SWITCH_ENTRY_FLOW';

//Initial State
const initialState = FLOW_STATES.INDEX;

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SWITCH_ENTRY_FLOW: {
      const entryFlow = FLOW_STATES[action.flow];
      return entryFlow;
    }

    default: return state;
  }
}

// Action Creators

export function switchEntryFlow(flow) {
  return {
    type: SWITCH_ENTRY_FLOW,
    flow,
  };
}
