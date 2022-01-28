import React from 'react';
import PropTypes from 'prop-types';

import TimelineIcon from "@mui/icons-material/Timeline";
import Element from './Element';

const Timeline = (props) => {
  return (
    <div className='timeline app'>
      <div className='main'>
        <div className='title flex_middle'>
          <TimelineIcon className='mrg-r-point-5' style={{ fontSize: 30 }} />
          <div>TIMELINE</div>
        </div>
        <div className='line app'>
          <Element duration={300000} />
          <Element duration={900000} />
          <Element duration={1800000} />
          <Element duration={3600000} />
          <Element duration={7200000} />
          <Element duration={14400000} />
          <Element duration={14405000} />
        </div>
      </div>
    </div>
  );
};

Timeline.propTypes = {};

export default Timeline;
