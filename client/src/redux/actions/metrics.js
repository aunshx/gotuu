import api from "../../utils/api";

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
    AVG_DURATION_TUUS_PER_DAY_LOADING,
    AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,

} from "./types";

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

    const res = await api.get("/metrics/average-duration-tuus-per-day");

    let res2 = res.data.map((ele) => {
      return {
        name: ele.date.date,
        value: (ele.sum/6000).toFixed('0')
      }
    })
    
    let res3 = res.data.map((ele) => {
      return {
        name: ele.date.date,
        value: (ele.sum/360000).toFixed('1')
      }
    })



    let resMin = res2.reverse()
    let resHour = res3.reverse()

    console.log(res.data, resMin, resHour)

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY,
      payload: res3.reverse(),
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

    dispatch({
      type: AVG_DURATION_TUUS_PER_DAY_LOADING_COMPLETE,
    });
  }
};

// Get average duration of each tuu
export const getAvgDurationOfTuus = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: AVG_DURATION_TUUS_LOADING,
    });

    const res = await api.get("/metrics/average-duration-tuus");

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

    const res = await api.get("/metrics/total-number-tuus");

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
