import React from 'react';
import PropTypes from 'prop-types';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import BlockOne from './charts/BlockOne';
import BlockThree from './charts/BlockThree';
import LiveStreak from './blocks/LiveStreak';
import TotalTuus from './blocks/TotalTuus';
import CommonTime from './blocks/CommonTime';
import AvgBreakTime from './blocks/AvgBreakTime';
import TotalPerformance from './blocks/TotalPerformance';

const Metrics = ({ goToMain }) => {
  return (
    <div className='metrics flex_middle' id='metrics'>
      <div className='main'>
        <div className='title flex_middle'>
          <div>
            <FontAwesomeIcon
              icon={faChartBar}
              className='mrg-r-point-5'
              style={{ fontSize: 30 }}
            />
          </div>
          <div>Metrics</div>
        </div>
        <div className='details'>
          <div className='metrics_details_one' data-aos='fade-up'>
            <BlockOne />
          </div>
          <div className='metrics_details_two'>
            <div className='app'>
              <div data-aos='fade-up'>
                <LiveStreak />
              </div>
              <div data-aos='fade-up'>
                <TotalTuus />
              </div>
              <div data-aos='fade-up'>
                <CommonTime />
              </div>
              <div data-aos='fade-up'>
                <AvgBreakTime />
              </div>
              <div data-aos='fade-up'>
                <TotalPerformance />
              </div>
            </div>
          </div>
          <div className='metrics_details_three' data-aos='fade-up'>
            <BlockThree />
          </div>
        </div>
      </div>
      <div id='go-up' className='cursor_pointer' data-aos='fade-up-left'>
        <FontAwesomeIcon
          icon={faArrowCircleUp}
          style={{ fontSize: 35, color: "#7ed957" }}
          onClick={goToMain}
        />
      </div>
    </div>
  );
};

Metrics.propTypes = {};

export default Metrics;
