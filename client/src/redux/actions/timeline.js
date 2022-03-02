import moment from "moment";
import api from "../../utils/api";

import {
  // Snackbar
  ERROR_SNACKBAR,
  SNACKBAR_RESET,
  ERROR_AUTH_SNACKBAR,

  // Add to timeline
  ADD_ENTRY_TIMELINE,
  CREATE_TIMELINE,

  // Add dates captured
  CREATE_DATES_CAPTURED,
  ADD_DATES_CAPTURED,

  // Loading Timeline
  LOADING_TIMELINE,
  LOADING_TIMELINE_COMPLETE,

  // Delete Event
  DELETE_EVENT_LOADING,
  DELETE_EVENT,
  DELETE_EVENT_LOADING_COMPLETE,
} from "./types";

// Add duration after the event ends
export const addDurationToEventEnd = (id, duration) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  const body = JSON.stringify({
    id,
    duration,
  });

  try {
    let date = new Date()
    
    const res = await api.post("/timeline/add-details-event", body);

    dispatch(getTimelineEvent(date));

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

// Create a New Event
export const createNewEvent = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    const res = await api.get("/timeline/add-event");

    dispatch({
      type: ADD_ENTRY_TIMELINE,
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

// Get dates where event has been captured
export const getTimelineDatesCaptured = () => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };

  try {
    dispatch({
      type: LOADING_TIMELINE,
    });

    const res = await api.get("/timeline/get-dates-existing-events");

    dispatch({
      type: CREATE_DATES_CAPTURED,
      payload: res.data,
    });

    dispatch({
      type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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

// Get Timeline details from a single date
export const getTimelineEvent = (date) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };
  const body = JSON.stringify({ date });

  try {
    dispatch({
      type: LOADING_TIMELINE,
    });

    const res = await api.post(
      "/timeline/get-details-specific-date-event",
      body
    );

    dispatch({
      type: CREATE_TIMELINE,
      payload: res.data,
    });

    dispatch({
      type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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

// Get Timeline details from a single date ascending
export const getTimelineEventAsc = (date) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };
  const body = JSON.stringify({ date });

  try {
    dispatch({
      type: LOADING_TIMELINE,
    });

    const res = await api.post(
      "/timeline/get-details-specific-date-event-ascending",
      body
    );

    dispatch({
      type: CREATE_TIMELINE,
      payload: res.data,
    });

    dispatch({
      type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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
        type: LOADING_TIMELINE_COMPLETE,
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

// Get Timeline details from a single date ascending
export const deleteEvent = (eventId, dateSelected) => async (dispatch) => {
  let value = {
    message: "1",
    type: "info",
  };
  const body = JSON.stringify({ eventId });

  try {
    dispatch({
      type: DELETE_EVENT_LOADING,
    });

    const res = await api.post("/timeline/delete-event", body);

    dispatch({
      type: DELETE_EVENT,
      payload: eventId,
    });

    // dispatch(getTimelineEvent(moment(dateSelected).toISOString()));

    dispatch({
      type: DELETE_EVENT_LOADING_COMPLETE,
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
        type: DELETE_EVENT_LOADING_COMPLETE,
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
        type: DELETE_EVENT_LOADING_COMPLETE,
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
        type: DELETE_EVENT_LOADING_COMPLETE,
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
        type: DELETE_EVENT_LOADING_COMPLETE,
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
