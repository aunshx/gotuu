import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Intro from "./Intro";
import HowTo from "./HowTo";
import Attribution from "./Attribution";

const ProfileDetails = ({ fixedContent }) => {

  const walkthroughRef = useRef()
  const introRef = useRef();
  const attributionRef = useRef();

  const [introOnly, setIntroOnly] = useState(true);
  const [walkthroughOnly, setWalkthroughOnly] = useState(false);
  const [attributionOnly, setAttributionOnly] = useState(false);

  const shiftToEventsOnly = () => {
    setIntroOnly(false);
    setAttributionOnly(false);
    setWalkthroughOnly(true);
    walkthroughRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const shiftToQuestionsOnly = () => {
    setIntroOnly(false);
    setWalkthroughOnly(false);
    setAttributionOnly(true);
    attributionRef.current.scrollIntoView({ behavior: 'smooth' })
  };

  const shiftToAll = () => {
    setWalkthroughOnly(false);
    setAttributionOnly(false);
    setIntroOnly(true);
    introRef.current.scrollIntoView({ behavior: 'smooth' })
  };

  return (
    <>
      <div className='about_sidebar'>
        <div className='about_sidebar_details'>
          <div className={fixedContent ? "contents-fixed" : "contents"}>
            <nav className='contents_div'>
              <div className='flex_middle'>
                <div className='title flex_middle'>Contents</div>
              </div>
              <div className='list'>
                <div className=''>
                  <div className='flex_middle'>
                    <div style={{ marginRight: "0.8em" }}>
                      <ul>
                        <li style={{ padding: "0.4em 0" }} onClick={shiftToAll}>
                          <div className={introOnly ? "link-active" : "link"}>
                            <span className='number'>1.</span>
                            <span>Intro</span>
                          </div>
                        </li>
                        <li
                          style={{ padding: "0.4em 0" }}
                          onClick={shiftToEventsOnly}
                        >
                          <div
                            className={walkthroughOnly ? "link-active" : "link"}
                          >
                            <span className='number'>2.</span>
                            <span>Walkthrough</span>
                          </div>
                        </li>
                        <li
                          style={{ padding: "0.4em 0" }}
                          onClick={shiftToQuestionsOnly}
                        >
                          <div
                            className={
                              attributionOnly ? "link-active" : "link"
                            }
                          >
                            <span className='number'>3.</span>
                            <span>Attribution</span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className='details'>
            <Intro innerRef={introRef} />
            <HowTo innerRef={walkthroughRef} />
            <Attribution innerRef={attributionRef}  />
          </div>
        </div>
      </div>
    </>
  );
};

ProfileDetails.propTypes = {};

export default ProfileDetails;
