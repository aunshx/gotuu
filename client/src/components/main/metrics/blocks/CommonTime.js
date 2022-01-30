import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "../DurationSelector";
import { Tooltip } from "@mui/material";

const message = "Average duration of tuus all time";

const CommonTime = ({ avgDurationTuus, avgDurationTuusLoading }) => {
  const [duration, setDuration] = useState("week");
  const [showInHours, setShowInHours] = useState(false);

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
            <Tooltip title={showInHours ? "Hours" : "Minutes"} placement='top'>
              <div
                className={`flex_middle cursor_pointer`}
                onClick={() => setShowInHours(!showInHours)}
              >
                {showInHours
                  ? (avgDurationTuus / 3600000).toFixed("2")
                  : (avgDurationTuus / 60000).toFixed("0")}
              </div>
            </Tooltip>
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
