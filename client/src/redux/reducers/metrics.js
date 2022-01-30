import {
  TOTAL_COUNT_TUUS,
  TOTAL_COUNT_TUUS_LOADING,
  TOTAL_COUNT_TUUS_LOADING_COMPLETE,
} from "../actions/types";

const initialState = {
  totalCountTuus: 0,
  totalCountTuusLoading: false
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
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
