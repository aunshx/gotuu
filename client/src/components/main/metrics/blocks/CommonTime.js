import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "../DurationSelector";

const message = "Average duration of tuus all time";

const CommonTime = ({ avgDurationTuus, avgDurationTuusLoading }) => {
  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Avg Tuu Duration</div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_middle'>
          <div style={{ marginRight: "10px" }}>
            <FontAwesomeIcon
              icon={faStopwatch}
              style={{ fontSize: 22, color: "orange" }}
            />
          </div>
          <div>{avgDurationTuus}</div>
        </div>
        <div className='top_margin_progress_blocks flex_middle'>
          <DurationSelector
            duration={duration}
            onChangeDuration={onChangeDuration}
          />
        </div>
      </div>
    </div>
  );
};

CommonTime.propTypes = {};

export default CommonTime;
