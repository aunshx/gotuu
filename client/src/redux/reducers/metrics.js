import {
  TOTAL_COUNT_TUUS,
  TOTAL_COUNT_TUUS_LOADING,
  TOTAL_COUNT_TUUS_LOADING_COMPLETE,

  //   Avg Duration of Tuus
  AVG_DURATION_TUUS,
  AVG_DURATION_TUUS_LOADING,
  AVG_DURATION_TUUS_LOADING_COMPLETE,

  // Avg Duration of Tuus
  AVG_DURATION_TUUS_PER_DAY,
  AVG_DURATION_TUUS_PER_DAY_HOURS,
  AVG_DURATION_TUUS_PER_DAY_LOADING,
  AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,

  // Number of Tuus- Graph
  NUMBER_OF_TUUS,
  NUMBER_OF_TUUS_LOADING,
  NUMBER_OF_TUUS_LOADING_COMPLETE,

  // Live Streak
  LIVE_STREAK,
  LIVE_STREAK_LOADING,
  LIVE_STREAK_LOADING_COMPLETE,
} from "../actions/types";

const initialState = {
  // Total Count -- BLOCK
  totalCountTuus: 0,
  totalCountTuusLoading: false,

  // Avg Duration - BLOCK
  avgDurationTuus: 0,
  avgDurationTuusLoading: false,

  // Avg DUration Per Day - GRAPH
  avgDurationTuusPerDay: [],
  avgDurationTuusPerDayHours: [],
  avgDurationTuusPerDayLoading: false,

  // Number of Tuus - GRAPH
  numberOfTuusGraph: [],
  numberOfTuusGraphLoading: false,

  // Live Streak 
  liveStreak: 0,
  liveStreakLoading: false
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    //   Live Streak
    case LIVE_STREAK:
      return {
        ...state,
        liveStreak: payload,
      };
    case LIVE_STREAK_LOADING:
      return {
        ...state,
        liveStreakLoading: true,
      };
    case LIVE_STREAK_LOADING_COMPLETE:
      return {
        ...state,
        liveStreakLoading: false,
      };

    //   Avg Duration of Tuus Per Day
    case NUMBER_OF_TUUS:
      return {
        ...state,
        numberOfTuusGraph: payload,
      };
    case NUMBER_OF_TUUS_LOADING:
      return {
        ...state,
        numberOfTuusGraphLoading: true,
      };
    case NUMBER_OF_TUUS_LOADING_COMPLETE:
      return {
        ...state,
        numberOfTuusGraphLoading: false,
      };

    //   Avg Duration of Tuus Per Day
    case AVG_DURATION_TUUS_PER_DAY:
      return {
        ...state,
        avgDurationTuusPerDay: payload,
      };
    case AVG_DURATION_TUUS_PER_DAY_HOURS:
      return {
        ...state,
        avgDurationTuusPerDayHours: payload,
      };
    case AVG_DURATION_TUUS_PER_DAY_LOADING:
      return {
        ...state,
        avgDurationTuusPerDayLoading: true,
      };
    case AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE:
      return {
        ...state,
        avgDurationTuusPerDayLoading: false,
      };

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
