import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "../DurationSelector";

const message = "Number of continuos days of completing tuus";

const LiveStreak = (props) => {
  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div className='progress_blocks_main' style={{ marginTop: 0 }}>
      <div className='progress_blocks_individual_headers'>
        <div>Live Streak</div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_middle' style={{ marginBottom: '0.5em' }}>
          <div style={{ marginRight: "10px" }}>
            <FontAwesomeIcon
              icon={faFire}
              style={{ fontSize: 22, color: "orange" }}
            />
          </div>
          <div>10</div>
        </div>
      </div>
    </div>
  );
};

LiveStreak.propTypes = {};

export default LiveStreak;
