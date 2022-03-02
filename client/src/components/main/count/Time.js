import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  setFifteenMinAlert,
  setThirtyMinAlert,
  setOneHourAlert,
  setTwoHourAlert,
  setThreeHourAlert,
} from "../../../redux/actions/settings";

const Time = ({
  time,
  stopTime,
  // Redux Actions
  setFifteenMinAlert,
  setThirtyMinAlert,
  setOneHourAlert,
  setTwoHourAlert,
  setThreeHourAlert,
}) => {
  useEffect(() => {
    switch (true) {
      case time === 900000:
        setFifteenMinAlert();
        break;

      case time === 1800000:
        setThirtyMinAlert();
        break;

      case time === 3600000:
        setOneHourAlert();
        break;

      case time === 7200000:
        setTwoHourAlert();
        break;

      case time === 10800000:
        setThreeHourAlert();
        break;

      // Automatically stop session when crossing 6 hours
      case time === 21600000:
        stopTime()
        break

      default:
        return null;
    }
  });
  return (
    <div>
      <span className='digits'>
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className='digits'>
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <span className='digits mili-sec'>
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
};

Time.propTypes = {
  addDurationToEventEnd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
  setFifteenMinAlert,
  setThirtyMinAlert,
  setOneHourAlert,
  setTwoHourAlert,
  setThreeHourAlert,
};

export default connect(mapStateToProps, mapActionsToProps)(Time);

