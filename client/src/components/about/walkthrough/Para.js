import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

import Tags from './Tags'

import defaultImage from '../../../resources/images/default.jpg'

const Para = ({
  srNo,
  imageLight,
  imageDark,
  title,
  details,
  tags,
  // Redux States
  settings: { displayMode }
}) => {

  return (
    <div
      className={
        displayMode
          ? "walkthrough-para"
          : "walkthrough-para  walkthrough-para--dark"
      }
    >
      <div className='title-para flex_middle'>
        <span style={{ marginRight: "0.3em" }}>{srNo}.</span> {title}
      </div>
      <div className='image-para flex_middle'>
        <img
          src={
            displayMode ? imageLight || defaultImage : imageDark || defaultImage
          }
          alt='Registration Process Gif'
        />
      </div>
      <div className='flex_between ft-bold details-para'>
        <div style={{ fontSize: "0.9em", color: "grey" }}>
          Details
        </div>
        <div className='flex_between'>
            {tags.length > 0 && tags.map((element, index) => (
                <Tags key={index} title={element} />
            ))}
        </div>
      </div>
      <div className='caption'>
        <ul>
          {details.length > 0 &&
            details.map((element, index) => <li key={index}>{element}</li>)}
        </ul>
      </div>
    </div>
  );
};

Para.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapStateToActions = {
};

export default connect(mapStateToProps, mapStateToActions)(Para);