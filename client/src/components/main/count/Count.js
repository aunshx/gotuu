import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Time from './Time'
import { connect } from 'react-redux';

import store from '../../../store'
import {
  ERROR_SNACKBAR,
  SNACKBAR_RESET,
  ADD_NEW_NOTE,
  ADD_NOTE_TITLE,
  ADD_NOTE_BODY,
} from "../../../redux/actions/types";
import {
  addDurationToEventEnd
} from '../../../redux/actions/timeline'

const Count = ({
  isHovering,
  isCounting,
  isHoveringTrue,
  isHoveringFalse,
  stopCountDown,
  scrollSmoothHandler,
  // Redux State
  timeline: {
    currentEventId
  },
  auth: { isAuthenticated },

  // Redux Actions
  addDurationToEventEnd,
}) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isCounting) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isCounting]);

  const stopCount = (currentEventId, time) => {
    if (time < 60000) {
      let value = {
        message: "Cannot stop before 1 min is over",
        type: "info",
      };
      store.dispatch({
        type: ERROR_SNACKBAR,
        payload: value,
      });

      setTimeout(
        () =>
          store.dispatch({
            type: SNACKBAR_RESET,
          }),
        5000
      );
    } else {
      stopCountDown();
      setTime(0);
      scrollSmoothHandler();
      if(isAuthenticated) {
        addDurationToEventEnd(currentEventId, time);
      }
      store.dispatch({
        type: ADD_NEW_NOTE,
        payload: "",
      });

      store.dispatch({
        type: ADD_NOTE_TITLE,
        payload: "",
      });

      store.dispatch({
        type: ADD_NOTE_BODY,
        payload: "",
      });
    }
    
  };

  const stopTime = () => {
    stopCountDown();
    setTime(0);
    scrollSmoothHandler();
    if (isAuthenticated) {
      addDurationToEventEnd(currentEventId, time);
    }
    store.dispatch({
      type: ADD_NEW_NOTE,
      payload: "",
    });

    store.dispatch({
      type: ADD_NOTE_TITLE,
      payload: "",
    });

    store.dispatch({
      type: ADD_NOTE_BODY,
      payload: "",
    });
  }

  return (
    <div
      className={
        isHovering
          ? "count_button flex_middle cursor_pointer"
          : "count_button flex_middle cursor_pointer"
      }
      onMouseEnter={isHoveringTrue}
      onMouseLeave={isHoveringFalse}
      onClick={() => stopCount(currentEventId, time)}
    >
      <Time time={time} stopTime={stopTime} />
    </div>
  );
};

Count.propTypes = {
  timeline: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addDurationToEventEnd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timeline: state.timeline,
  auth: state.auth,
});

const mapActionsToProps = {
  addDurationToEventEnd
};

export default connect(mapStateToProps, mapActionsToProps)(Count);
