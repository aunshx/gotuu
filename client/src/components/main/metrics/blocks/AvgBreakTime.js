import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import SnoozeIcon from "@mui/icons-material/Snooze";
import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "../DurationSelector";

const message = "Average duration of breaks taken between 2 tuus";

const AvgBreakTime = (props) => {
  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Avg Break Time b/w Tuus</div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_middle'>
          <div style={{ marginRight: "10px" }}>
            <SnoozeIcon               style={{ fontSize: 22, color: "orange", marginTop: '0.25em' }}
 />

          </div>
          <div>10</div>
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

AvgBreakTime.propTypes = {};

export default AvgBreakTime;
