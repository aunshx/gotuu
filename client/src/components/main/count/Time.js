import React from 'react';
import PropTypes from 'prop-types';

const Time = ({ time }) => {
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

Time.propTypes = {};

export default Time;
