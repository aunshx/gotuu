import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faFire,
  faArrowDown,
  faClipboardList,
  faGlobeAsia,
  faBowlingBall,
} from "@fortawesome/free-solid-svg-icons";
import { Divider } from "@mui/material";

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
                      <li
                        className={showAll ? "active" : ""}
                        onClick={shiftToAll}
                      >
                        1.
                        <span>Intro</span>
                      </li>
                      <li
                        className={showChallengesOnly ? "active" : ""}
                        onClick={shiftToChallengesOnly}
                      >
                        2.
                        <span>Why?</span>
                      </li>
                      <li
                        className={showQuestionsOnly ? "active" : ""}
                        onClick={shiftToQuestionsOnly}
                      >
                        3.
                        <span>How To</span>
                      </li>
                      <li
                        className={showDualsOnly ? "active" : ""}
                        onClick={shiftToDualsOnly}
                      >
                        4.
                        <span>FAQs</span>
                      </li>
                      <li
                        className={showEventsOnly ? "active" : ""}
                        onClick={shiftToEventsOnly}
                      >
                        5.
                        <span>Future</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
        <div className='details'>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
            <div>s</div>
        </div>
      </div>
    </div>
  );
};

ProfileDetails.propTypes = {};

export default ProfileDetails;
