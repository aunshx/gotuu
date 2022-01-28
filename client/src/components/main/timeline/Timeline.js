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
        <div className='line'>
          <div className='flex_left'>
            <Element duration={300000} />
          </div>
          <div className='flex_middle'>
            <div className={`liner_mini_left cursor_pointer`}></div>
          </div>
          <div className='flex_right'>
            <Element duration={900000} />
          </div>
          <div className='flex_middle'>
            <div className={`liner_tiny_right cursor_pointer`}></div>
          </div>
          <div className='flex_left'>
            <Element duration={1800000} />
          </div>
          <div className='flex_middle'>
            <div className={`liner_extra-small_left cursor_pointer`}></div>
          </div>
          <div className='flex_right'>
            <Element duration={3600000} />
          </div>
          <div className='flex_middle'>
            <div className={`liner_small_right cursor_pointer`}></div>
          </div>
          <div className='flex_left'>
            <Element duration={7200000} />
          </div>
          <div className='flex_middle'>
            <div className={`liner_medium_left cursor_pointer`}></div>
          </div>
          <div className='flex_right'>
            <Element duration={14400000} />
          </div>
          <div className='flex_middle'>
            <div className={`liner_large_right cursor_pointer`}></div>
          </div>
          <div className='flex_left'>
            <Element duration={14405000} />
          </div>
          <div className='flex_middle'>
            <div className={`liner_humongous_left cursor_pointer`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

Timeline.propTypes = {};

export default Timeline;
