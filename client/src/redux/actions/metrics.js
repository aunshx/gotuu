import api from "../../utils/api";
import switchMonth from "../../utils/switchMonth";
import {switchMonth2Min, switchMonth2Hrs} from "../../utils/switchMonth2";

import {
  // Snackbar
  ERROR_SNACKBAR,
  SNACKBAR_RESET,

  // Total Count Tuus
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
} from "./types";

// Get avg duration of tuus per day - seven days
export const getLiveStreak = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: LIVE_STREAK_LOADING,
    });

    const res = await api.get("/metrics/live-streak");

    dispatch({
      type: LIVE_STREAK,
      payload: res.data,
    });

    dispatch({
      type: LIVE_STREAK_LOADING_COMPLETE ,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: LIVE_STREAK_LOADING_COMPLETE ,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: LIVE_STREAK_LOADING_COMPLETE ,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: LIVE_STREAK_LOADING_COMPLETE ,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: LIVE_STREAK_LOADING_COMPLETE ,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// Get avg duration of tuus per day - seven days
export const getNumberOfTuusPerDay = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: NUMBER_OF_TUUS_LOADING,
    });

    const res = await api.get("/metrics/number-of-tuus-per-day-sevendays");

    let res2 = res.data.map((ele) => {
      return {
        name: ele.date.date,
        value: ele.count,
      };
    });

    dispatch({
      type: NUMBER_OF_TUUS,
      payload: res2,
    });

    dispatch({
      type: NUMBER_OF_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// Get avg duration of tuus per day - per month
export const getNumberOfTuusCurrentMonth = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: NUMBER_OF_TUUS_LOADING,
    });

    const res = await api.get(
      "/metrics/number-of-tuus-per-day-currentMonth"
    );

      let res2 = res.data.map((ele) => {
        return switchMonth(ele)
      })

    dispatch({
      type: NUMBER_OF_TUUS,
      payload: res2,
    });

    dispatch({
      type: NUMBER_OF_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// Get avg duration of tuus per day - per year
export const getNumberOfTuusYear = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: NUMBER_OF_TUUS_LOADING,
    });

    const res = await api.get("/metrics/number-of-tuus-per-day-year");

      let res2 = res.data.map((ele) => {
        return {
          name: ele.date.date,
          value: ele.count,
        };
      });

    dispatch({
      type: NUMBER_OF_TUUS,
      payload: res2,
    });

    dispatch({
      type: NUMBER_OF_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: NUMBER_OF_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// -------------- BLOCK ONE - GRAPH ------------------------------
// Get avg duration of tuus per day
export const getAvgDurationOfTuusPerDay = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_LOADING,
    });

    const res = await api.get(
      "/metrics/average-duration-tuus-per-day-sevendays"
    );

    console.log(res.data)

    let resMin = res.data.map((ele) => {
      return {
        name: ele.date.date,
        value: (ele.sum/60000).toFixed('0')
      }
    })
    
    let resHour = res.data.map((ele) => {
      return {
        name: ele.date.date,
        value: (ele.sum/3600000).toFixed('3')
      }
    })

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY,
      payload: resMin,
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_HOURS,
      payload: resHour,
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// Get avg duration of tuus per day - per month
export const getAvgDurationOfTuusPerDayPerMonth = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_LOADING,
    });

    const res = await api.get("/metrics/average-duration-tuus-per-day-monthly");

    let resMin = res.data.map((ele) => {
      return switchMonth2Min(ele)
    });

    let resHour = res.data.map((ele) => {
      return switchMonth2Hrs(ele);
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY,
      payload: resMin,
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_HOURS,
      payload: resHour,
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// Get avg duration of tuus per day - per year
export const getAvgDurationOfTuusPerDayPerYear = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_LOADING,
    });

    const res = await api.get("/metrics/average-duration-tuus-per-day-yearly");

    let resMin = res.data.map((ele) => {
      return {
        name: ele.date.date,
        value: (ele.sum / 60000).toFixed("0"),
      };
    });

    let resHour = res.data.map((ele) => {
      return {
        name: ele.date.date,
        value: (ele.sum / 3600000).toFixed("3"),
      };
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY,
      payload: resMin,
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_HOURS,
      payload: resHour,
    });

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// ---------------------------- TOTAL TUUS - BLOCK ----------------------------

// ----------------------------  TODAY ---------------------------------------

// Get dates where event has been captured
export const getTotalNumberOfTuus = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  }; 

  try {
    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING,
    });

    const res = await api.get("/metrics/total-number-tuus-today");

    dispatch({
      type: TOTAL_COUNT_TUUS,
      payload: res.data,
    });

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  }
};

// ----------------------------  7 Days ---------------------------------------

// Get dates where event has been captured
export const getTotalNumberOfTuusSevenDays = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING,
    });

    const res = await api.get("/metrics/total-number-tuus-seven-days");

    dispatch({
      type: TOTAL_COUNT_TUUS,
      payload: res.data,
    });

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  }
};

// ---------------------------------- MONTH ------------------------------------

// Get dates where event has been captured
export const getTotalNumberOfTuusMonth = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING,
    });

    const res = await api.get("/metrics/total-number-tuus-monthly");

    dispatch({
      type: TOTAL_COUNT_TUUS,
      payload: res.data,
    });

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  }
};
// ---------------------------------- YEAR ------------------------------------

// Get dates where event has been captured
export const getTotalNumberOfTuusYear = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING,
    });

    const res = await api.get("/metrics/total-number-tuus-yearly");

    dispatch({
      type: TOTAL_COUNT_TUUS,
      payload: res.data,
    });

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  }
};

// ---------------------------------- ALL TIME ------------------------------------

// Get dates where event has been captured
export const getTotalNumberOfTuusAllTime = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING,
    });

    const res = await api.get("/metrics/total-number-tuus-all-time");

    dispatch({
      type: TOTAL_COUNT_TUUS,
      payload: res.data,
    });

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }

    dispatch({
      type: TOTAL_COUNT_TUUS_LOADING_COMPLETE,
    });
  }
};

// ---------------------------- COMMON TIME - BLOCK ----------------------------

// ----------------------------  TODAY ---------------------------------------

// Get dates where event has been captured
export const getAvgDurationOfTuus = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  }; 

  try {
    dispatch({
      type: AVG_DURATION_TUUS_LOADING,
    });

    const res = await api.get("/metrics/average-duration-tuus-today");

    dispatch({
      type: AVG_DURATION_TUUS,
      payload: res.data,
    });

    dispatch({
      type: AVG_DURATION_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// ----------------------------  7 Days ---------------------------------------

// Get dates where event has been captured
export const getAvgDurationOfTuusSevenDays = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_LOADING,
    });

    const res = await api.get(
      "/metrics/average-duration-tuus-seven-days"
    );

    dispatch({
      type: AVG_DURATION_TUUS,
      payload: res.data,
    });

    dispatch({
      type: AVG_DURATION_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};
  
// ---------------------------------- MONTH ------------------------------------

// Get dates where event has been captured
export const getAvgDurationOfTuusMonth = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_LOADING,
    });

    const res = await api.get("/metrics/average-duration-tuus-monthly");

    dispatch({
      type: AVG_DURATION_TUUS,
      payload: res.data,
    });

    dispatch({
      type: AVG_DURATION_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};
// ---------------------------------- YEAR ------------------------------------

// Get dates where event has been captured
export const getAgDurationOfTuusYear = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_LOADING,
    });

    const res = await api.get("/metrics/average-duration-tuus-yearly");

    dispatch({
      type: AVG_DURATION_TUUS,
      payload: res.data,
    });

    dispatch({
      type: AVG_DURATION_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }
  }
};

// ---------------------------------- ALL TIME ------------------------------------

// Get average duration of each tuu
export const getAvgDurationOfTuusAllTime = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_LOADING,
    });

    const res = await api.get("/metrics/average-duration-tuus-all-time");

    dispatch({
      type: AVG_DURATION_TUUS,
      payload: res.data,
    });

    dispatch({
      type: AVG_DURATION_TUUS_LOADING_COMPLETE,
    });
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      value.message = error.response.data.errors[0].msg;
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "Your session has expired. Please login again.";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Looks like something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: AVG_DURATION_TUUS_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    }

    dispatch({
      type: AVG_DURATION_TUUS_LOADING_COMPLETE,
    });
  }
};