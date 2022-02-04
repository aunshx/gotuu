import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <div className='footer flex_middle'>
      <span className='mrg-r-pointfive'>{String.fromCodePoint('0X00A9')}</span> Gotuu 2022
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
