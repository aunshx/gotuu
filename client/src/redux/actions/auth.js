import api from "../../utils/api";
import setAuthToken from "../../utils/setAuthToken";
import moment from "moment";

import {
  getTimelineDatesCaptured,
  getTimelineEvent
} from './timeline'

import {
  getAvgDurationOfTuusPerDay,
  getAvgDurationOfTuus,
  getTotalNumberOfTuus,
} from "./metrics";

import {
  // Snackbar
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
} from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await api.get("/auth/get-data");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });

    let date = new Date()

    dispatch(getTimelineDatesCaptured());
    dispatch(getTimelineEvent(moment(date).toISOString()));
    dispatch(getAvgDurationOfTuusPerDay());
    dispatch(getAvgDurationOfTuus());
    dispatch(getTotalNumberOfTuus());

  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User kk
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await api.post("/auth/register", body);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;

      dispatch({
        type: REGISTER_FAIL,
      });
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

      console.log(res);

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
      dispatch({
        type: LOGIN_LOADING_COMPLETE,
      });

    }
  };

// Logout
export const logout = () => ({ type: LOGOUT });
