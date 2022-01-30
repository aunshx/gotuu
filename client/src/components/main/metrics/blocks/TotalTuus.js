import React, { useState } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

import QuestionMarkTrigger from "./QuestionMarkTrigger";
import DurationSelector from "../DurationSelector";

import logo from '../../../../resources/images/gotuuLogo.png'

const message = "Total number of tuus completed";

const TotalTuus = (props) => {
  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };

  return (
    <div className='progress_blocks_main'>
      <div className='progress_blocks_individual_headers'>
        <div>Total Tuus</div>
        <QuestionMarkTrigger message={message} />
      </div>
      <div className=''>
        <div className='flex_middle'>
          <div style={{ margin: "3px 10px 0 0" }}>
            <img src={logo} alt="GoTuu Logo" />
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

TotalTuus.propTypes = {};

export default TotalTuus;
