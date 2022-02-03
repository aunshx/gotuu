import api from "../../utils/api";
import moment from "moment";

import {
  // Snackbar
  ERROR_SNACKBAR,
  SNACKBAR_RESET,

  // Sound
  SOUND_STATUS,
  SOUND_OFF,
  SOUND_ON,

  // Alerts
  TEN_MIN_ALERT,
  THIRTY_MIN_ALERT,
  ONE_HOUR_ALERT,
  TWO_HOUR_ALERT,
  THREE_HOUR_ALERT,
  REMINDER_ALERT_RESET,
} from "./types";

// 10 Min Alert 
export const setTenMinAlert = () => async (dispatch) => {
   dispatch({
     type: TEN_MIN_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 3000)
}

// 30 Min Alert 
export const setThirtyMinAlert = () => async (dispatch) => {
   dispatch({
     type: THIRTY_MIN_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 3000)
}

// 1 Hour Alert 
export const setOneHourAlert = () => async (dispatch) => {
   dispatch({
     type: ONE_HOUR_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 3000)
}

// 2 Hour Alert 
export const setTwoHourAlert = () => async (dispatch) => {
   dispatch({
     type: TWO_HOUR_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 3000)
}

// 3 Hour Alert 
export const setThreeHourAlert = () => async (dispatch) => {
   dispatch({
     type: THREE_HOUR_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 3000)
}

// Get SOund Status
export const getSoundStatus = () => async (dispatch) => {
  const value = {};

  try {

    const res = await api.get("/settings/get-sound-status");

    dispatch({
        type: SOUND_STATUS,
        payload: res.data,
    });

  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
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

// Sound On
export const setSoundOn = () => async (dispatch) => {
  const value = {};

  try {
    dispatch({
      type: SOUND_ON,
      payload: true,
    });

    const res = await api.post("/settings/set-sound-on");
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: SOUND_ON,
        payload: false,
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
        type: SOUND_ON,
        payload: false,
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
        type: SOUND_ON,
        payload: false,
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
        type: SOUND_ON,
        payload: false,
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

// Sound Off
export const setSoundOff = () => async (dispatch) => {
  const value = {};

  try {
    dispatch({
      type: SOUND_OFF,
      payload: false,
    });

    const res = await api.post("/settings/set-sound-off");
  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: SOUND_OFF,
        payload: true,
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
        type: SOUND_OFF,
        payload: true,
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
        type: SOUND_OFF,
        payload: true,
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
        type: SOUND_OFF,
        payload: true,
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
