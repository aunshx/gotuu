import React from 'react';
import PropTypes from 'prop-types';

const Intro = (props) => {
  return (
    <div className='pages' id='intro-about'>
      <div className='title flex_middle'>Introduction</div>
      <div className='page-details flex_left'>
        <div>
          <span className='title' style={{ fontSize: "1.5em" }}>
            H
          </span>
          i! Welcome to <span  className='title' style={{ fontSize: '1em' }} >Gotuu</span>. If you are here, I believe you're curious about
          this website and what it actually accomplishes. So, fret not! In the
          following sections you'll get a brief overview of what does Gotuu
          entail and how to use it. This website was made so that I and many like me, could focus
          on our task in <b>short</b>, <b>effective</b> and <b>well-defined</b>{" "}
          <b>periods</b> of time without dillydallying. So, with that being said,
          I would love to extend this tool to all who want to improve their work
          efficiency. It is free and always will be!
        </div>
      </div>
    </div>
  );
};

Intro.propTypes = {};

export default Intro;
