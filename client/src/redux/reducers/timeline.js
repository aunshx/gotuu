import {
  // Add New challenge
  ADD_NEW_CHALLENGE_LOADING,
  ADD_NEW_CHALLENGE_LOADING_RESET,
  ADD_NEW_CHALLENGE_SUCCESSFUL,

  // Challenge List
  SET_RERENDER_STATE_CHALLENGE_TRUE,
  SET_RERENDER_STATE_CHALLENGE_FALSE,
  STORE_CHALLENGES_LIST,
  STORE_NEW_CHALLENGE_IN_LIST,

  // Inner info add
  CHALLENGE_CREATOR_NAME_ADD,
  CHALLENGE_QUESTIONS_DETAILS_ADD,
  ADD_ENTRY_TIMELINE,
} from "../actions/types";
//
const initialState = {
  timeline: []
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Add New Entry to Details
    case ADD_ENTRY_TIMELINE:
        return {
            timeline: [...state.timeline, payload]
        }

    default:
      return state;
  }
}

export default authReducer;
