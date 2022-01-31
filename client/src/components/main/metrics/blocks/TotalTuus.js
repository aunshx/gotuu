import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "./DurationSelector";

import logo from '../../../../resources/images/gotuuLogo.png'

import {
  getTotalNumberOfTuus,
  getTotalNumberOfTuusSevenDays,
  getTotalNumberOfTuusMonth,
  getTotalNumberOfTuusYear,
  getTotalNumberOfTuusAllTime,
} from "../../../../redux/actions/metrics";

const message = "Total number of tuus completed";

const TotalTuus = ({
  data,
  loading,
  // Redux Actions
  getTotalNumberOfTuus,
  getTotalNumberOfTuusSevenDays,
  getTotalNumberOfTuusMonth,
  getTotalNumberOfTuusYear,
  getTotalNumberOfTuusAllTime,
}) => {
  const [duration, setDuration] = useState("today");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
    if (e.target.value === "today") {
      getTotalNumberOfTuus();
    }
    if (e.target.value === "week") {
      getTotalNumberOfTuusSevenDays();
    }
    if (e.target.value === "month") {
      getTotalNumberOfTuusMonth();
    }
    if (e.target.value === "year") {
      getTotalNumberOfTuusYear();
    }
    if (e.target.value === "all-time") {
      getTotalNumberOfTuusAllTime();
    }
  };

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Total Tuus</div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_middle'>
          {loading ? (
            <div className='spinner-graph'></div>
          ) : (
            <>
              <div style={{ margin: "3px 10px 0 0" }}>
                <img src={logo} alt='GoTuu Logo' />
              </div>
              <div>{data}</div>
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

TotalTuus.propTypes = {
  getTotalNumberOfTuus: PropTypes.func.isRequired,
  getTotalNumberOfTuusSevenDays: PropTypes.func.isRequired,
  getTotalNumberOfTuusMonth: PropTypes.func.isRequired,
  getTotalNumberOfTuusYear: PropTypes.func.isRequired,
  getTotalNumberOfTuusAllTime: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapStateToActions = {
  getTotalNumberOfTuus,
  getTotalNumberOfTuusSevenDays,
  getTotalNumberOfTuusMonth,
  getTotalNumberOfTuusYear,
  getTotalNumberOfTuusAllTime,
};

export default connect(mapStateToProps, mapStateToActions)(TotalTuus);

