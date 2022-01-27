import React from 'react';
import PropTypes from 'prop-types';

const Go = ({ isHovering, isHoveringTrue, isHoveringFalse, startCountDown }) => {
  return (
    <div
      className={
        isHovering
          ? "button_hover flex_middle cursor_pointer"
          : "button flex_middle cursor_pointer"
      }
      onMouseEnter={isHoveringTrue}
      onMouseLeave={isHoveringFalse}
      onClick={startCountDown}
    >
      Go
    </div>
  );
};

Go.propTypes = {};

export default Go;
