import api from "../../utils/api";

import {
  // Snackbar
  ERROR_SNACKBAR,
  SNACKBAR_RESET,
  ERROR_AUTH_SNACKBAR,

  // Create note
  ADD_NEW_NOTE,
  ADD_NOTE_TITLE,
  ADD_NOTE_BODY,
  SUCCESS_200
} from "./types";

// Add note data body
export const getNote = (eventId) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  let body = JSON.stringify({
    eventId,
  });

  try {
    const res = await api.post("/notes/get-note", body)

    return res.data

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

      dispatch({
        type: ERROR_AUTH_SNACKBAR,
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

// Add note data body
export const sendNoteDataBody = (noteId, body) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  let bodySend = JSON.stringify({
    noteId,
    body,
  });

  try {
    
    dispatch({
      type: ADD_NOTE_BODY,
      payload: body,
    });

    const res = await api.post("/notes/insert-data-note-body", bodySend)
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

      dispatch({
        type: ERROR_AUTH_SNACKBAR,
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

// Delete Note
export const sendNoteTitle = (noteId, title) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  let bodySend = JSON.stringify({
    noteId,
    title,
  });

  try {
    
    dispatch({
      type: ADD_NOTE_TITLE,
      payload: title,
    });

    const res = await api.post("/notes/insert-data-note-title", bodySend)
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

      dispatch({
        type: ERROR_AUTH_SNACKBAR,
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

// Delete Note
export const deleteNote = (noteId) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  let body = JSON.stringify({
    noteId,
  });

  try {
    
    const res = await api.delete("/notes/delete-note", {data: body});

    dispatch({
      type: ADD_NEW_NOTE,
      payload: '',
    });

    dispatch({
      type: ADD_NOTE_TITLE,
      payload: '',
    });

    dispatch({
      type: ADD_NOTE_BODY,
      payload: '',
    });

    value.message = "Tuu & it's Note deleted successfully!"
    value.type = 'success'

    dispatch({
      type: SUCCESS_200,
      payload: value
    })

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

// Create a new Note
export const createNewNote = (eventId) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  let body = JSON.stringify({
    eventId
  })

  try {
    
    const res = await api.post("/notes/create-note", body);

    dispatch({
      type: ADD_NEW_NOTE,
      payload: res.data,
    });

  } catch (error) {
    if (error.response.status === 500) {
      value.message = "Oops! Something went wrong. Please reload!";
      value.type = "error";

      dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      })

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
      })

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
      })

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
      })

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
