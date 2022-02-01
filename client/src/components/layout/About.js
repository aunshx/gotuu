import React from 'react';
import PropTypes from 'prop-types';

import Navbar from '../navbar/Navbar'

const About = (props) => {
  return (
    <>
      <Navbar />
      <div className='about'>
        <div className='main-about flex_middle'>
          <div className='image'>
            <div className='title'>About</div>
            <div className='credits'>
              Photo by{" "}
              <a
                href='https://unsplash.com/@nate_dumlao?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
                style={{ color: "grey" }}
              >
                Nathan Dumlao
              </a>{" "}
              on{" "}
              <a
                href='https://unsplash.com/s/photos/time?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
                style={{ color: "grey" }}
              >
                Unsplash
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

About.propTypes = {};

export default About;
