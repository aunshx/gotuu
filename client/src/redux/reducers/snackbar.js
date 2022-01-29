import {
  SNACKBAR_RESET,
  ERROR_SNACKBAR,
  ERROR_AUTH_SNACKBAR,
  SUCCESS_200,
} from "../actions/types";

import { nanoid } from "nanoid";

const initialState = {
  message: "",
  type: "info",
  key: "",
  errorSnackbar: false
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ERROR_AUTH_SNACKBAR:
        return {
          ...state,
            errorSnackbar: true
        }
    case ERROR_SNACKBAR:
    case SUCCESS_200:
      return {
        ...state,
        message: payload.message,
        type: payload.type,
        key: nanoid(),
      };
    case SNACKBAR_RESET:
      return {
        ...state,
        message: "",
        key: "",
        errorSnackbar: false
      };

    default:
      return state;
  }
}
// .
export default authReducer;
