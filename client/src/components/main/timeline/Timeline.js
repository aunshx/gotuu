import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

import TimelineIcon from "@mui/icons-material/Timeline";
import Element from './Element';

const Timeline = ({ goToMain }) => {
  return (
    <>
      <div className='timeline app'>
        <div className='main'>
          <div className='title flex_middle'>
            <TimelineIcon className='mrg-r-point-5' style={{ fontSize: 30 }} />
            <div>TUULINE</div>
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
        <div id='go-up' className='cursor_pointer'>
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            style={{ fontSize: 35, color: "#7ed957" }}
            onClick={goToMain}
          />
        </div>
      </div>
    </>
  );
};

Timeline.propTypes = {};

export default Timeline;
