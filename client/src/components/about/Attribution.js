import React from "react";
import PropTypes from "prop-types";

const Attribution = ({ innerRef, secondInnerRef }) => {
  return (
    <div className='pages' id='faqs-about' ref={innerRef}>
      <div className='title flex_middle'>Attribution</div>
      <div className='page-details app' ref={secondInnerRef}>
        <div style={{ textAlign: "center", margin: '0.5em' }}>
          'About' Page Photo by{" "}
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
        <div style={{ textAlign: "center" }}>
          '404 Not Found' Page Photo by{" "}
          <a
            href='https://unsplash.com/@bradhelmink?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
            style={{ color: "grey" }}
          >
            Brad Helmink
          </a>{" "}
          on{" "}
          <a
            href='https://unsplash.com/s/photos/unknown?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'
            style={{ color: "grey" }}
          >
            Unsplash
          </a>
        </div>
      </div>
    </div>
  );
};

Attribution.propTypes = {};

export default Attribution;
