import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";

import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "./DurationSelector";
import { Tooltip } from "@mui/material";

import {
  getAvgDurationOfTuus,
  getAvgDurationOfTuusSevenDays,
  getAvgDurationOfTuusMonth,
  getAgDurationOfTuusYear,
  getAvgDurationOfTuusAllTime,
} from "../../../../redux/actions/metrics";
import { connect } from "react-redux";

const message = "Average duration of tuus all time";

const CommonTime = ({
  data,
  loading,
  // Redux Actions
  getAvgDurationOfTuus,
  getAvgDurationOfTuusSevenDays,
  getAvgDurationOfTuusMonth,
  getAgDurationOfTuusYear,
  getAvgDurationOfTuusAllTime,
}) => {
  const [duration, setDuration] = useState("today");
  const [showInHours, setShowInHours] = useState(false);

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
    if (e.target.value === "today") {
      getAvgDurationOfTuus();
    }
    if (e.target.value === "week") {
      getAvgDurationOfTuusSevenDays();
    }
    if (e.target.value === "month") {
      getAvgDurationOfTuusMonth();
    }
    if (e.target.value === "year") {
      getAgDurationOfTuusYear();
    }
    if (e.target.value === "all-time") {
      getAvgDurationOfTuusAllTime();
    }
  };

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Avg Tuu Duration</div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div
          className='flex_middle info cursor_pointer'
          onClick={() => setShowInHours(!showInHours)}
        >
          {loading ? (
            <div className='spinner-graph'></div>
          ) : (
            <>
              <div style={{ marginRight: "10px" }}>
                <FontAwesomeIcon
                  icon={faStopwatch}
                  style={{ fontSize: 22, color: "orange" }}
                />
              </div>
              <Tooltip
                title={showInHours ? "Hours" : "Minutes"}
                placement='top'
              >
                <div className={`flex_middle`}>
                  {showInHours
                    ? (data / 3600000).toFixed("2")
                    : (data / 60000).toFixed("0")}
                </div>
              </Tooltip>
            </>
          )}
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

CommonTime.propTypes = {
  getAvgDurationOfTuus: PropTypes.func.isRequired,
  getAvgDurationOfTuusSevenDays: PropTypes.func.isRequired,
  getAvgDurationOfTuusMonth: PropTypes.func.isRequired,
  getAgDurationOfTuusYear: PropTypes.func.isRequired,
  getAvgDurationOfTuusAllTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapStateToActions = {
  getAvgDurationOfTuus,
  getAvgDurationOfTuusSevenDays,
  getAvgDurationOfTuusMonth,
  getAgDurationOfTuusYear,
  getAvgDurationOfTuusAllTime,
};

export default connect(mapStateToProps, mapStateToActions)(CommonTime);

