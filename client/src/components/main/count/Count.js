import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Time from './Time'

const Count = ({
  isHovering,
  isCounting,
  isHoveringTrue,
  isHoveringFalse,
  stopCountDown,
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

  const stopCount = () => {
    stopCountDown();
    setTime(0);
  };

  return (
    <div
      className={
        isHovering
          ? "count_button flex_middle cursor_pointer"
          : "count_button flex_middle cursor_pointer"
      }
      onMouseEnter={isHoveringTrue}
      onMouseLeave={isHoveringFalse}
      onClick={stopCount}
    >
      <Time time={time} />
    </div>
  );
};

Count.propTypes = {};

export default Count;
