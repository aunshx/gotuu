import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Intro from "./Intro";
import Why from "./Why";
import HowTo from "./HowTo";
import Faqs from "./Faqs";
import Future from "./Future";


const ProfileDetails = ({ fixedContent }) => {
  const [showAll, setShowAll] = useState(true);
  const [showEventsOnly, setShowEventsOnly] = useState(false);
  const [showChallengesOnly, setShowChallengesOnly] = useState(false);
  const [showQuestionsOnly, setShowQuestionsOnly] = useState(false);
  const [showDualsOnly, setShowDualsOnly] = useState(false);

  const shiftToEventsOnly = () => {
    setShowAll(false);
    setShowChallengesOnly(false);
    setShowQuestionsOnly(false);
    setShowDualsOnly(false);

    setShowEventsOnly(true);
  };
  const shiftToChallengesOnly = () => {
    setShowAll(false);
    setShowEventsOnly(false);
    setShowQuestionsOnly(false);
    setShowDualsOnly(false);

    setShowChallengesOnly(true);
  };
  const shiftToQuestionsOnly = () => {
    setShowAll(false);
    setShowEventsOnly(false);
    setShowChallengesOnly(false);
    setShowDualsOnly(false);

    setShowQuestionsOnly(true);
  };
  const shiftToDualsOnly = () => {
    setShowAll(false);
    setShowEventsOnly(false);
    setShowChallengesOnly(false);
    setShowQuestionsOnly(false);

    setShowDualsOnly(true);
  };

  const shiftToAll = () => {
    setShowEventsOnly(false);
    setShowChallengesOnly(false);
    setShowQuestionsOnly(false);
    setShowDualsOnly(false);

    setShowAll(true);
  };

  return (
    <div className='about_sidebar'>
      <div className='about_sidebar_details'>
        <div className={fixedContent ? "contents-fixed" : "contents"}>
          <nav className='contents_div'>
            <div className='flex_middle'>
              <div className='title flex_middle'>Contents</div>
            </div>
            <div className='list'>
              <div className='upperlist'></div>
              <div className=''>
                <div className='flex_middle'>
                  <div style={{ marginRight: "0.8em" }}>
                    <ul>
                      <li style={{ padding: "0.4em 0" }} onClick={shiftToAll}>
                        <a
                          href='#intro-about'
                          className={showAll ? "link-active" : "link"}
                        >
                          1.
                          <span>Intro</span>
                        </a>
                      </li>
                      <li
                        style={{ padding: "0.4em 0" }}
                        onClick={shiftToEventsOnly}
                      >
                        <a
                          href='#why-about'
                          className={showEventsOnly ? "link-active" : "link"}
                        >
                          2.
                          <span>Walkthrough</span>
                        </a>
                      </li>
                      <li
                        style={{ padding: "0.4em 0" }}
                        onClick={shiftToQuestionsOnly}
                      >
                        <a
                          href='#faqs-about'
                          className={showQuestionsOnly ? "link-active" : "link"}
                        >
                          3.
                          <span>FAQs</span>
                        </a>
                      </li>
                      <li
                        style={{ padding: "0.4em 0" }}
                        onClick={shiftToDualsOnly}
                      >
                        <a
                          href='#future-about'
                          className={showDualsOnly ? "link-active" : "link"}
                        >
                          4.
                          <span>Future</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className='details'>
          <Intro />
          <HowTo />
          <Faqs />
          <Future />
        </div>
      </div>
    </div>
  );
};

ProfileDetails.propTypes = {};

export default ProfileDetails;