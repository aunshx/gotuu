import { SNACKBAR_RESET } from "./types";

export const snackbarDeactivate = (value) => async (dispatch) => {
  dispatch({
    type: SNACKBAR_RESET,
  });
};
