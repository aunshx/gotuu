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
  TEN_SEC_ALERT,
  TEN_MIN_ALERT,
  THIRTY_MIN_ALERT,
  ONE_HOUR_ALERT,
  TWO_HOUR_ALERT,
  THREE_HOUR_ALERT,
  REMINDER_ALERT_RESET,

  // DISPLAY PREFERENCE
  LIGHT_MODE,
  DARK_MODE,

  // Reminders
  REMINDER_STATUS,
  REMINDER_ON,
  REMINDER_OFF
} from "./types";

// Get Reminder Status
export const getReminderStatus = () => async (dispatch) => {
  const value = {};

  try {

    const res = await api.get("/settings/get-reminder-status");

    dispatch({
        type: REMINDER_STATUS,
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
}

// Reminder On
export const setReminderOn = () => async (dispatch) => {
  const value = {};

  try {
    dispatch({
      type: REMINDER_ON,
      payload: true,
    });

    const res = await api.post("/settings/set-reminder-on");

  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: REMINDER_ON,
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
        type: REMINDER_ON,
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
        type: REMINDER_ON,
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
        type: REMINDER_ON,
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

// Reminder Off
export const setReminderOff = () => async (dispatch) => {
  const value = {};

  try {
    dispatch({
      type: REMINDER_OFF,
      payload: false,
    });

    const res = await api.post("/settings/set-reminder-off");

  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      dispatch({
        type: REMINDER_OFF,
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
        type: REMINDER_OFF,
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
        type: REMINDER_OFF,
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
        type: REMINDER_OFF,
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

// Light Mode Toggle 
export const toggleLightMode = () => async (dispatch) => {
  dispatch({
    type: LIGHT_MODE
  })
}

// Dark Mode Toggle
export const toggleDarkMode = () => async (dispatch) => {
  dispatch({
    type: DARK_MODE
  })
}

// 10 sec Alert 
export const setTenSecAlert = () => async (dispatch) => {
  console.log('TEN SEC ACTION')
   dispatch({
     type: TEN_SEC_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 5000)
}

// 10 Min Alert 
export const setTenMinAlert = () => async (dispatch) => {
   dispatch({
     type: TEN_MIN_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 5000)
}

// 30 Min Alert 
export const setThirtyMinAlert = () => async (dispatch) => {
   dispatch({
     type: THIRTY_MIN_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 5000)
}

// 1 Hour Alert 
export const setOneHourAlert = () => async (dispatch) => {
   dispatch({
     type: ONE_HOUR_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 5000)
}

// 2 Hour Alert 
export const setTwoHourAlert = () => async (dispatch) => {
   dispatch({
     type: TWO_HOUR_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 5000)
}

// 3 Hour Alert 
export const setThreeHourAlert = () => async (dispatch) => {
   dispatch({
     type: THREE_HOUR_ALERT,
   });

   setTimeout(() =>
     dispatch({
       type: REMINDER_ALERT_RESET
     }), 5000)
}

// Get Sound Status
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
