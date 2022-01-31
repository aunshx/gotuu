import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSmileBeam, faFrown, faMeh } from "@fortawesome/free-solid-svg-icons";
import SnoozeIcon from "@mui/icons-material/Snooze";
import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "../DurationSelector";
import { useEffect } from "react";

const message = "Total performance is calculated based on the avg duration of break times and avg duration of a tuu";

const TotalPerformance = ({ data, loading }) => {
    const [isSmiling, setIsSmiling] = useState(false)
    const [isMeh, setIsMeh] = useState(false)
    const [isFrown, setIsFrown] = useState(false)

    useEffect(() => {
      if (data <= 1800000) {
        setIsFrown(true);
        setIsSmiling(false);
        setIsMeh(false);
      }

      if (1800000 < data && data <= 3600000) {
        setIsFrown(false);
        setIsSmiling(false);
        setIsMeh(true);
      }

      if (3600000 < data) {
        setIsFrown(false);
        setIsSmiling(true);
        setIsMeh(false);
      }
    }, [data])

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Total Performance </div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_middle' style={{ marginBottom: "0.5em" }}>
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
                  color: "#e52e2e",
                  marginTop: "0.2em",
                }}
              />
            )}
          </div>
          {isSmiling && <div>Good</div>}
          {isMeh && <div>Average</div>}
          {isFrown && <div>Bad</div>}
        </div>
      </div>
    </div>
  );
};

TotalPerformance.propTypes = {};

export default TotalPerformance;
