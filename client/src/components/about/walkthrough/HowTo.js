import React from 'react';
import PropTypes from 'prop-types';
import Para from './Para';

const HowTo = ({ innerRef, secondInnerRef }) => {
  return (
    <div className='pages' id='walkthrough-about' ref={innerRef}>
      <div className='title flex_middle'>Walkthrough</div>
      <div className='page-details-walkthrough' ref={secondInnerRef}>
        <div className='writing app'>
          <Para srNo={1} />
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
          <div>s</div>
        j</div>
      </div>
    </div>
  );
};

HowTo.propTypes = {};

export default HowTo;
