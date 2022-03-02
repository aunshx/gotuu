import React, { useState, useRef, useCallback } from "react";
import PropTypes from 'prop-types';

import Navbar from '../navbar/Navbar'
import Sidebar from './Sidebar'

const About = (props) => {

  let checker = useRef();
  const [fixedContent, setFixedContent] = useState(false);

  const refElement = useCallback((node) => {
    if (checker.current) {
      checker.current.disconnect();
    }
    const options = {
      root: null,
      threshold: 0,
    };
    checker.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setFixedContent(false);
      } else {
        setFixedContent(true);
      }
    }, options);
    if (node) {
      checker.current.observe(node);
    }
  }, []);


  return (
    <>
      <Navbar />
      <div className='about'>
        <div className='main-about'>
          <div className='image flex_middle'>
            <div className='title'>About</div>
            <div className='credits' ref={refElement} style={{ height: '1px' }}>
            </div>
          </div>
          <div>
            <Sidebar fixedContent={fixedContent} />
          </div>
        </div>
      </div>
    </>
  );
};

About.propTypes = {};

export default About;
