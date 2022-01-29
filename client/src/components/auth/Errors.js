import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ message }) => { 
  return <div className='errors'>
      {message}
  </div>;
};

Errors.propTypes = {};

export default Errors;
