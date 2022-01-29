import {
  // Timeline Specifics
  CREATE_TIMELINE,
  ADD_ENTRY_TIMELINE,

  CREATE_DATES_CAPTURED,
  ADD_DATES_CAPTURED,

  // Loading
  LOADING_TIMELINE,
  LOADING_TIMELINE_COMPLETE,
} from "../actions/types";
//
const initialState = {
  timeline: [],
  datesCaptured: [],
  timelineLoading: false
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // Create dates captured
    case CREATE_DATES_CAPTURED:
      return {
        ...state,
        datesCaptured: payload,
      };

    // Create new timeline
    case CREATE_TIMELINE:
      return {
        ...state,
        timeline: payload,
      };

    // Create new timeline
    case ADD_ENTRY_TIMELINE:
      return {
        ...state,
        timeline: [...state.timeline, payload],
      };

    // Loading Timeline
    case LOADING_TIMELINE:
      return {
        ...state,
        timelineLoading: true,
      };

    // Loading Timeline True
    case LOADING_TIMELINE_COMPLETE:
      return {
        ...state,
        timelineLoading: false,
      };

    default:
      return state;
  }
}

export default authReducer;
