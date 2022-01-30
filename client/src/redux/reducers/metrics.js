import {
  TOTAL_COUNT_TUUS,
  TOTAL_COUNT_TUUS_LOADING,
  TOTAL_COUNT_TUUS_LOADING_COMPLETE,

  //   Avg Duration of Tuus
  AVG_DURATION_TUUS,
  AVG_DURATION_TUUS_LOADING,
  AVG_DURATION_TUUS_LOADING_COMPLETE,
} from "../actions/types";

const initialState = {
  totalCountTuus: 0,
  totalCountTuusLoading: false,

    // Avg Duration 
    avgDurationTuus: 0,
    avgDurationTuusLoading: false,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //   Avg Duration of Tuus
    case AVG_DURATION_TUUS:
      return {
        ...state,
        avgDurationTuus: payload,
      };
    case AVG_DURATION_TUUS_LOADING:
      return {
        ...state,
        avgDurationTuusLoading: true,
      };
    case AVG_DURATION_TUUS_LOADING_COMPLETE:
      return {
        ...state,
        avgDurationTuusLoading: false,
      };

    //   Total Count Tuus
    case TOTAL_COUNT_TUUS:
      return {
        ...state,
        totalCountTuus: payload,
      };
    case TOTAL_COUNT_TUUS_LOADING:
      return {
        ...state,
        totalCountTuusLoading: true,
      };
    case TOTAL_COUNT_TUUS_LOADING_COMPLETE:
      return {
        ...state,
        totalCountTuusLoading: false,
      };

    default:
      return state;
  }
}
// .
export default authReducer;
