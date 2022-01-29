import React from 'react';
import PropTypes from 'prop-types';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import BlockOne from './charts/BlockOne';

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
        <div className="details">
            <div className="metrics_details_one">
                <BlockOne />
            </div>
            <div className="metrics_details_two">

            </div>
            <div className="metrics_details_three">k</div>
            <div className="metrics_details_four">l</div>
        </div>
      </div>
      <div id='go-up' className='cursor_pointer'>
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
