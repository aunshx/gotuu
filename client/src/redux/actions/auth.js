import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";
import moment from "moment";
import axios from 'axios'

import {
  getTimelineDatesCaptured,
  getTimelineEvent,
  deleteAllEmptyEvents,
} from "./timeline";

import {
  getAvgDurationOfTuusPerDay,
  getAvgDurationOfTuus,
  getTotalNumberOfTuus,
  getNumberOfTuusPerDay,
  getLiveStreak,
} from "./metrics";

import { getSoundStatus, getReminderStatus } from "./settings";

import {
  // Snackbar
  SUCCESS_200,
  ERROR_SNACKBAR,
  SNACKBAR_RESET,
  ERROR_AUTH_SNACKBAR,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,

  // Loading
  LOGIN_LOADING,
  LOGIN_LOADING_COMPLETE,

  // Change Password - Verify Email
  VERIFY_EMAIL_LOADING,
  VERIFY_EMAIL_LOADING_COMPLETE,
  VERIFY_EMAIL,

  // Change Password - Check Security Answers
  CHECK_SECURITY_ANSWERS_LOADING,
  CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
  CHECK_SECURITY_ANSWERS,

  // Change Password - Finale
  CHANGE_PASSWORD_LOADING,
  CHANGE_PASSWORD_LOADING_COMPLETE,
  CHANGE_PASSWORD,

  // Set Count Login
  SET_COUNT_LOGIN,

  //  Current Location
  CURRENT_LOCATION,
} from "./types";

// Current location capture 
export const captureCurrentLocation = () => async (dispatch, getState) => {
  const ipDeets = await axios.get("https://api.ipify.org?format=json/");
  const ipDetails = await axios.get(`http://ip-api.com/json/${ipDeets.data}`);

  dispatch({
    type: CURRENT_LOCATION,
    payload: ipDetails.data.timezone,
  });

  let date = new Date();

  dispatch(deleteAllEmptyEvents());
   dispatch(getTimelineDatesCaptured());
   dispatch(getTimelineEvent(moment(date).toISOString()));
   dispatch(getAvgDurationOfTuusPerDay());
   dispatch(getNumberOfTuusPerDay());
   dispatch(getAvgDurationOfTuus());
   dispatch(getTotalNumberOfTuus());
   dispatch(getLiveStreak());
   dispatch(getSoundStatus());
   dispatch(getReminderStatus());
};

// Change count for login
export const setCountLogin = (value) => async (dispatch) => {
  dispatch({
    type: SET_COUNT_LOGIN,
    payload: value
  });
};

// Reset Security Answers password change values 
export const resetSecurityAnswersCheck = () => async (dispatch) => {
  dispatch({
    type: CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
  });
  dispatch({
    type: SNACKBAR_RESET
  })
}

// Reset Verify Email password change values 
export const resetVerifyEmail = () => async (dispatch) => {
  dispatch({
    type: VERIFY_EMAIL_LOADING_COMPLETE
  })
  dispatch({
    type: SNACKBAR_RESET
  })
}

// Complete reset
export const resetChangePassword = () => async (dispatch) => {
  dispatch({
    type: VERIFY_EMAIL_LOADING_COMPLETE,
  });
  dispatch({
    type: CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
  });
  dispatch({
    type: CHANGE_PASSWORD_LOADING_COMPLETE,
  });
  dispatch({
    type: SNACKBAR_RESET,
  });
};


// Verify Email for change password
export const verifyEmail =
  (email) => async (dispatch) => {
    const value = {};

    const body = JSON.stringify({ email });

    try {
      dispatch({
        type: VERIFY_EMAIL_LOADING,
      });

      const res = await api.post("/auth/verify-email-change-password", body);

      let pay = {
        email,
        details: res.data
      }

      dispatch({
        type: VERIFY_EMAIL,
        payload: pay
      });

      value.message = "Email Verified!";
      value.type = "success";

      dispatch({
        type: SUCCESS_200,
        payload: value,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } catch (error) {
      if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: VERIFY_EMAIL_LOADING_COMPLETE,
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
          type: VERIFY_EMAIL_LOADING_COMPLETE,
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
          type: VERIFY_EMAIL_LOADING_COMPLETE,
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
          type: VERIFY_EMAIL_LOADING_COMPLETE,
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

// Check security answers for change password
export const checkSecurityAnswers =
  (
    securityQuestionOneAnswer,
    securityQuestionTwoAnswer,
    securityQuestionThreeAnswer,
    securityQuestionOne,
    securityQuestionTwo,
    securityQuestionThree,
    emailChangePassword
  ) =>
  async (dispatch) => {
    const value = {};

    const body = JSON.stringify({
      securityQuestionOneAnswer,
      securityQuestionTwoAnswer,
      securityQuestionThreeAnswer,
      securityQuestionOne,
      securityQuestionTwo,
      securityQuestionThree,
      emailChangePassword,
    });

    try {
      dispatch({
        type: CHECK_SECURITY_ANSWERS_LOADING,
      });

      const res = await api.post(
        "/auth/check-security-answers-change-password",
        body
      );

      dispatch({
        type: CHECK_SECURITY_ANSWERS,
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
          type: CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
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
          type: CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
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
          type: CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
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
          type: CHECK_SECURITY_ANSWERS_LOADING_COMPLETE,
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

// Change Password
export const changePasswordUser = (password, emailChangePassword) => async (dispatch) => {
    const value = {};

    const body = JSON.stringify({
      password,
      email: emailChangePassword,
    });

    try {
      dispatch({
        type: CHANGE_PASSWORD_LOADING,
      });

      const res = await api.post(
        "/auth/change-password",
        body
      );

      value.message =  'Password changed successfully!'
      value.type =  'success'

      dispatch({
        type: SUCCESS_200,
        payload: value
      })

      dispatch({
        type: CHANGE_PASSWORD,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } catch (error) {
      if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: CHANGE_PASSWORD_LOADING_COMPLETE,
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
          type: CHANGE_PASSWORD_LOADING_COMPLETE,
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
          type: CHANGE_PASSWORD_LOADING_COMPLETE,
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
          type: CHANGE_PASSWORD_LOADING_COMPLETE,
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


// Load User
export const loadUser = () => async (dispatch, getState) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
     try {
       const res = await api.get("/auth/get-data");

       dispatch({
         type: USER_LOADED,
         payload: res.data,
       });

       dispatch(captureCurrentLocation())
     } catch (err) {
       dispatch({
         type: AUTH_ERROR,
       });
     }
  }
};

// Register User kk
export const register =
  ( name,
        email,
        password,
        securityQuestionOne,
        securityQuestionTwo,
        securityQuestionThree,
        securityQuestionOneAnswer,
        securityQuestionTwoAnswer,
        securityQuestionThreeAnswer
         ) =>
  async (dispatch) => {
    const value = {}

    const body = JSON.stringify({ name,
        email,
        password,
        securityQuestionOne,
        securityQuestionTwo,
        securityQuestionThree,
        securityQuestionOneAnswer,
        securityQuestionTwoAnswer,
        securityQuestionThreeAnswer
       });

    try {

      dispatch({
        type: LOGIN_LOADING,
      });

      const res = await api.post("/auth/register", body);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      value.message='Welcome to Gotuu!'
      value.type='success'

      dispatch({
        type: SUCCESS_200,
        payload: value,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

      dispatch(loadUser());
      
    } catch (error) {
     if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
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
          type: ERROR_AUTH_SNACKBAR,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 401) {
        value.message = 'Your session has expired. Please login again.';
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
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
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: REGISTER_FAIL,
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

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    let value = {
      message: '1',
      type: 'info'
    }
    const body = JSON.stringify({ email, password });

    try {
      dispatch({
        type: LOGIN_LOADING,
      });

      const res = await api.post("/auth/login", body);

      dispatch({
        type: LOGIN_LOADING_COMPLETE,
      });

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload!";
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
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
          type: ERROR_AUTH_SNACKBAR,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 401) {
        value.message = 'Your session has expired. Please login again.';
        value.type = "error";

        dispatch({
          type: ERROR_SNACKBAR,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
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
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
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
        type: LOGIN_FAIL,
      });

    }
  };

// Logout
export const logout = () => ({ type: LOGOUT });
