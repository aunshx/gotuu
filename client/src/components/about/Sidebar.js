import React, { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Intro from "./Intro";
import HowTo from "./walkthrough/HowTo";
import Attribution from "./Attribution";
import Footer from "../layout/Footer";

const ProfileDetails = ({ fixedContent }) => {

  const walkthroughRef = useRef()
  const introRef = useRef();
  const attributionRef = useRef();

  const [introOnly, setIntroOnly] = useState(true);
  const [walkthroughOnly, setWalkthroughOnly] = useState(false);
  const [attributionOnly, setAttributionOnly] = useState(false);

   const refElement = useCallback((node) => {
     if (introRef.current) {
       introRef.current.disconnect();
     }
     const options = {
       root: null,
       threshold: 0.5,
     };
     introRef.current = new IntersectionObserver((entries) => {
       if (entries[0].isIntersecting) {
         setIntroOnly(true);
         setWalkthroughOnly(false);
       } else {
         setIntroOnly(false);
         setWalkthroughOnly(true);
       }
     }, options);
     if (node) {
       introRef.current.observe(node);
     }
   }, []);

   const refElementWalkthrough = useCallback((node) => {
     if (walkthroughRef.current) {
       walkthroughRef.current.disconnect();
     }
     const options = {
       root: null,
       threshold: 0.2,
     };
     walkthroughRef.current = new IntersectionObserver((entries) => {
       if (entries[0].isIntersecting) {
         setIntroOnly(false);
         setWalkthroughOnly(true);
       } else {
         setWalkthroughOnly(false);
         setIntroOnly(true);
       }
     }, options);
     if (node) {
       walkthroughRef.current.observe(node);
     }
   }, []);

   const refElementAttribution = useCallback((node) => {
     if (attributionRef.current) {
       attributionRef.current.disconnect();
     }
     const options = {
       root: null,
       threshold: 0.8,
     };
     attributionRef.current = new IntersectionObserver((entries) => {
       if (entries[0].isIntersecting) {
         setWalkthroughOnly(false);
         setAttributionOnly(true);
       } else {
         setAttributionOnly(false);
         setWalkthroughOnly(true);
       }
     }, options);
     if (node) {
       attributionRef.current.observe(node);
     }
   }, []);

  const shiftToEventsOnly = () => {
    setIntroOnly(false);
    setAttributionOnly(false);
    setWalkthroughOnly(true);
    walkthroughRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const shiftToQuestionsOnly = () => {
    setIntroOnly(false);
    setWalkthroughOnly(false);
    setAttributionOnly(true);
    attributionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const shiftToAll = () => {
    setWalkthroughOnly(false);
    setAttributionOnly(false);
    setIntroOnly(true);
    introRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
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
                            className={attributionOnly ? "link-active" : "link"}
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
            <Intro innerRef={introRef} secondInnerRef={refElement} />
            <HowTo
              innerRef={walkthroughRef}
              secondInnerRef={refElementWalkthrough}
            />
            <Attribution
              innerRef={attributionRef}
              secondInnerRef={refElementAttribution}
            />
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

ProfileDetails.propTypes = {};

export default ProfileDetails;
