import React from 'react';
import PropTypes from 'prop-types';
import Para from './Para';

import {data} from './data'

const HowTo = ({ innerRef, secondInnerRef }) => {
  return (
    <div className='pages' id='walkthrough-about' ref={innerRef}>
      <div className='title flex_middle'>Walkthrough</div>
      <div className='page-details-walkthrough' ref={secondInnerRef}>
        <div className='writing app'>
          {data.length > 0 &&
            data.map((element, index) => (
              <Para
                key={index}
                imageLight={element.imageLight}
                srNo={index + 1}
                imageDark={element.imageDark}
                title={element.title}
                details={element.details}
                tags={element.tags}
                altImg={element.altImg}
                imageLightMobile={element.imageLightMobile}
                imageDarkMobile={element.imageDarkMobile}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

HowTo.propTypes = {};

export default HowTo;
