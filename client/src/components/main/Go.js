import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  createNewEvent
} from '../../redux/actions/timeline'

const Go = ({
  isHovering,
  isHoveringTrue,
  isHoveringFalse,
  startCountDown,
  // Redux Actions
  createNewEvent,
}) => {
  const createNewTuu = () => {
    startCountDown()
    createNewEvent()
  };

  return (
    <div
      className={"button flex_middle cursor_pointer"}
      onMouseEnter={isHoveringTrue}
      onMouseLeave={isHoveringFalse}
      onClick={createNewTuu}
    >
      Go
    </div>
  );
};


Go.propTypes = {
  createNewEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
  createNewEvent,
};

export default connect(mapStateToProps, mapActionsToProps)(Go);
