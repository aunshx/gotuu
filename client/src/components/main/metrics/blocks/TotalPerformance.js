import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam, faFrown, faMeh } from "@fortawesome/free-solid-svg-icons";
import SnoozeIcon from "@mui/icons-material/Snooze";
import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "../DurationSelector";

const message = "Total performance is calculated based on the avg duration of break times and avg duration of a tuu";

const TotalPerformance = (props) => {
    const [isSmiling, setIsSmiling] = useState(false)
    const [isMeh, setIsMeh] = useState(true)
    const [isFrown, setIsFrown] = useState(false)

  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Total Performance </div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_middle'>
          <div style={{ marginRight: "10px" }}>
            {isSmiling && (
              <FontAwesomeIcon
                icon={faSmileBeam}
                style={{ fontSize: 22, color: "#7ed957", marginTop: "0.2em" }}
              />
            )}
            {isMeh && (
              <FontAwesomeIcon
                icon={faMeh}
                style={{ fontSize: 22, color: "#3abcfc", marginTop: "0.2em" }}
              />
            )}
            {isFrown && (
              <FontAwesomeIcon
                icon={faFrown}
                style={{
                  fontSize: 22,
                  color: "##3abcfc",
                  marginTop: "0.2em",
                }}
              />
            )}
          </div>
          {isSmiling && <div>Good</div>}
          {isMeh && <div>Average</div>}
          {isFrown && <div>Bad</div>}
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

TotalPerformance.propTypes = {};

export default TotalPerformance;
