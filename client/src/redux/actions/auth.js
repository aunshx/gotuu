import api from "../../utils/api";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  FORGOT_PASSWORD_LINK_SENT,
  FORGOT_PASSWORD_LINK_RECEIVED,
  FORGOT_PASSWORD_LINK_RESET,
  SUBMIT_RESET_PASSWORD_TRUE,
  SUBMIT_RESET_PASSWORD_FALSE,
  SUBMIT_BUTTON_REST_PASSWORD_FALSE,
  SUBMIT_BUTTON_COMPLETE_RESET,
  ERROR_400,
  ERROR_401,
  ERROR_500,
  SUCCESS_200,
  ERROR_SOMETHING_ELSE,
  SNACKBAR_RESET,
  SUBMIT_BUTTON_ERROR_INVALID_SECURITY_CODE,
  SUBMIT_BUTTON_ERROR_VALID_SECURITY_CODE,
  LOGIN_LOADING,
  LOGIN_LOADING_COMPLETE,
  LOGIN_LOADING_ERROR,
  LOGIN_LOADING_ERROR_RESOLVED,

  // Upload Image
  UPLOAD_IMAGE_LOADING_COMPLETE,
  UPLOAD_IMAGE_LOADING,

  // Uploading Cover Pic
  UPLOAD_COVER_PIC_LOADING,
  UPLOAD_COVER_PIC_LOADING_COMPLETE,
} from "./types";

// Upload Image for Cover Pic
export const uploadCoverPic = (url) => async (dispatch) => {
  const value = {};

  const body = JSON.stringify({
    url,
  });

  console.log(body);

  try {
    dispatch({
      type: UPLOAD_COVER_PIC_LOADING,
    });

    const res = await api.post("/users/upload-cover-pic", body);

    dispatch({
      type: UPLOAD_COVER_PIC_LOADING_COMPLETE,
      payload: res.data.cover_photo,
    });

    value.message = "Cover picture changed successfully!";

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
      value.message = "Oops! Something went wrong. Please reload.";
      value.type = "error";

      dispatch({
        type: ERROR_500,
        payload: value,
      });

      dispatch({
        type: UPLOAD_COVER_PIC_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      if (error.response.data.errors.length > 0) {
        value.message = error.response.data.errors[0].msg;
      } else {
        value.message =
          "Could not upload profile pic. Please try again after sometime.";
      }

      value.type = "error";

      dispatch({
        type: ERROR_400,
        payload: value,
      });

      dispatch({
        type: UPLOAD_COVER_PIC_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Something went wrong. Please reload.";
      value.type = "error";

      dispatch({
        type: ERROR_500,
        payload: value,
      });

      dispatch({
        type: UPLOAD_COVER_PIC_LOADING_COMPLETE,
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

// Upload Image for Profile
export const uploadProfilePic = (url) => async (dispatch) => {
  const value = {};

  const body = JSON.stringify({
    url,
  });

  console.log(body);

  try {
    dispatch({
      type: UPLOAD_IMAGE_LOADING,
    });

    const res = await api.post("/users/upload-profile-pic", body);

    dispatch({
      type: UPLOAD_IMAGE_LOADING_COMPLETE,
      payload: res.data.profile_photo,
    });

    value.message = "Profile picture changed successfully!";

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
      value.message = "Oops! Something went wrong. Please reload.";
      value.type = "error";

      dispatch({
        type: ERROR_500,
        payload: value,
      });

      dispatch({
        type: UPLOAD_IMAGE_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 400) {
      if (error.response.data.errors.length > 0) {
        value.message = error.response.data.errors[0].msg;
      } else {
        value.message =
          "Could not upload profile pic. Please try again after sometime.";
      }

      value.type = "error";

      dispatch({
        type: ERROR_400,
        payload: value,
      });

      dispatch({
        type: UPLOAD_IMAGE_LOADING_COMPLETE,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Oops! Something went wrong. Please reload.";
      value.type = "error";

      dispatch({
        type: ERROR_500,
        payload: value,
      });

      dispatch({
        type: UPLOAD_IMAGE_LOADING_COMPLETE,
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
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get("/users/get-data");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, password, username }) =>
  async (dispatch) => {
    const value = {};

    const body = JSON.stringify({
      name,
      password,
      username,
    });

    try {
      dispatch({
        type: LOGIN_LOADING,
      });

      const res = await api.post("/users/register", body);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.user,
      });

      dispatch({
        type: LOGIN_LOADING_COMPLETE,
      });
    } catch (error) {
      if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload.";
        value.type = "error";

        dispatch({
          type: ERROR_500,
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
        value.message = "Please enter a valid email ID.";
        value.type = "error";

        dispatch({
          type: ERROR_400,
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
        value.message = "Oops! Something went wrong. Please reload.";
        value.type = "error";

        dispatch({
          type: ERROR_500,
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

// Login User and dispatch loaduser
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    const value = {};

    // Attach the headers
    const body = JSON.stringify({ password, username });

    try {
      dispatch({
        type: LOGIN_LOADING,
      });

      const res = await api.post("/users/login", body);

      dispatch({
        type: LOGIN_LOADING_COMPLETE,
      });

      dispatch(loadUser());

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please reload.";
        value.type = "error";

        dispatch({
          type: ERROR_500,
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
      } else if (error.response.status === 401) {
        value.message = "Invalid login credentials.";
        value.type = "error";

        dispatch({
          type: ERROR_401,
          payload: value,
        });

        dispatch({
          type: LOGIN_LOADING_COMPLETE,
        });

        dispatch({
          type: LOGIN_FAIL,
        });

        dispatch({
          type: LOGIN_LOADING_ERROR,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );

        setTimeout(
          () =>
            dispatch({
              type: LOGIN_LOADING_ERROR_RESOLVED,
            }),
          5000
        );
      } else if (error.response.status === 400) {
        value.message = "Please enter an email.";
        value.type = "error";

        dispatch({
          type: ERROR_400,
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
        value.message = "Oops! Something went wrong. Please reload.";
        value.type = "error";

        dispatch({
          type: ERROR_500,
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
    }
  };

// Logout
export const logout = () => async (dispatch) => {
  try {
    await api.get("/users/logout");

    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    const errors = error.response.data.errors;
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  const value = {};

  const body = JSON.stringify({ email });
  console.log(email, body);

  try {
    dispatch({
      type: FORGOT_PASSWORD_LINK_SENT,
    });

    const res = await api.post("/users/forgot-password", body);

    dispatch({
      type: FORGOT_PASSWORD_LINK_RECEIVED,
    });

    value.message = "Reset code sent";
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
    if (error.response.status === 400) {
      value.message = "Email ID is invalid";
      value.type = "error";

      dispatch({
        type: ERROR_400,
        payload: value,
      });

      dispatch({
        type: FORGOT_PASSWORD_LINK_RESET,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 401) {
      value.message = "You are unauthorized. Please login";
      value.type = "error";

      dispatch({
        type: ERROR_401,
        payload: value,
      });

      dispatch({
        type: FORGOT_PASSWORD_LINK_RESET,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else if (error.response.status === 500) {
      value.message = "Oops! Something went wrong.";
      value.type = "error";

      dispatch({
        type: ERROR_500,
        payload: value,
      });

      dispatch({
        type: FORGOT_PASSWORD_LINK_RESET,
      });

      setTimeout(
        () =>
          dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      value.message = "Something went wrong. Try again after sometime";
      value.type = "error";

      dispatch({
        type: ERROR_SOMETHING_ELSE,
        payload: value,
      });

      dispatch({
        type: FORGOT_PASSWORD_LINK_RESET,
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

export const resetForgotPassword = () => async (dispatch) => {
  dispatch({
    type: FORGOT_PASSWORD_LINK_RESET,
  });
};

export const resetPasswordSubmit =
  (securityCode, newPassword) => async (dispatch) => {
    const value = {};

    const body = JSON.stringify({ securityCode, newPassword });

    try {
      dispatch({
        type: SUBMIT_RESET_PASSWORD_TRUE,
      });

      const res = await api.post("/users/reset-password", body);

      dispatch({
        type: SUBMIT_RESET_PASSWORD_FALSE,
      });

      value.message = "Password changed successfully :)";
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

      setTimeout(
        () =>
          dispatch({
            type: SUBMIT_BUTTON_COMPLETE_RESET,
          }),
        10000
      );
      //
    } catch (error) {
      if (error.response.status === 400) {
        value.message = "Security code is invalid";
        value.type = "error";

        dispatch({
          type: ERROR_400,
          payload: value,
        });

        dispatch({
          type: SUBMIT_BUTTON_COMPLETE_RESET,
        });

        dispatch({
          type: SUBMIT_BUTTON_ERROR_INVALID_SECURITY_CODE,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );

        setTimeout(
          () =>
            dispatch({
              type: SUBMIT_BUTTON_ERROR_VALID_SECURITY_CODE,
            }),
          5000
        );
      } else if (error.response.status === 401) {
        value.message = "You are unauthorized. Please login";
        value.type = "error";

        dispatch({
          type: ERROR_401,
          payload: value,
        });

        dispatch({
          type: SUBMIT_BUTTON_COMPLETE_RESET,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else if (error.response.status === 500) {
        value.message = "Oops! Something went wrong. Please Reload!";
        value.type = "error";

        dispatch({
          type: ERROR_500,
          payload: value,
        });

        dispatch({
          type: SUBMIT_BUTTON_COMPLETE_RESET,
        });

        setTimeout(
          () =>
            dispatch({
              type: SNACKBAR_RESET,
            }),
          5000
        );
      } else {
        value.message = "Something went wrong. Try again after sometime";
        value.type = "error";

        dispatch({
          type: ERROR_SOMETHING_ELSE,
          payload: value,
        });

        dispatch({
          type: SUBMIT_BUTTON_COMPLETE_RESET,
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

export const resetSubmitFinalButton = () => async (dispatch) => {
  dispatch({
    type: SUBMIT_BUTTON_COMPLETE_RESET,
  });
};
