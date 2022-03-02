import React from 'react';
import PropTypes from 'prop-types';

const Intro = ({ innerRef, secondInnerRef }) => {
  return (
    <div className='pages' id='intro-about' ref={innerRef}>
      <div className='title flex_middle'>Introduction</div>
      <div className='page-details flex_left' ref={secondInnerRef}>
        <div>
          <span className='title' style={{ fontSize: "1.5em" }}>
            H
          </span>
          i! Welcome to{" "}
          <span className='title' style={{ fontSize: "1em" }}>
            Gotuu
          </span>
          . If you are here, I believe you're curious about this website and
          what it actually accomplishes.{" "}
          <i style={{ marginRight: "0.2em" }}>Gotuu</i> was made so that I and
          many like me, could focus on our task in <b>short</b>,{" "}
          <b>effective</b> and <b>well-defined</b> <b>periods</b> of time
          without dillydallying. It is free and always will be!
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = {};

export default Intro;
