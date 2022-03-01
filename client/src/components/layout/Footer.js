import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <div className='footer flex_middle'>
      <a href='https://aunsh.com' target={'_blank'} rel='noreferrer nofollow' >
        <span className='mrg-r-pointfive'>
          {String.fromCodePoint("0X00A9")}
        </span>
        aunsh 2022
      </a>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
