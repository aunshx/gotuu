import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import BlockOne from "./charts/BlockOne";
import BlockThree from "./charts/BlockThree";
import LiveStreak from "./blocks/LiveStreak";
import TotalTuus from "./blocks/TotalTuus";
import CommonTime from "./blocks/CommonTime";
import AvgBreakTime from "./blocks/AvgBreakTime";
import TotalPerformance from "./blocks/TotalPerformance";

import {
  getTotalNumberOfTuus,
  getAvgDurationOfTuus,
  getAvgDurationOfTuusPerDay,
} from "../../../redux/actions/metrics";

const New = ({
  goToMain,
  // Redux State
  metrics: {
    totalCountTuus,
    avgDurationTuus,
    avgDurationTuusPerDay,
    avgDurationTuusPerDayHours,
    numberOfTuusGraph,
    avgDurationTuusLoading,
    totalCountTuusLoading,
    avgDurationTuusPerDayLoading,
    numberOfTuusGraphLoading,
  },
  // Redux Actions
  // getTotalNumberOfTuus,
  // getAvgDurationOfTuus,
  // getAvgDurationOfTuusPerDay,
}) => {
  //   useEffect(() => {
  //       getTotalNumberOfTuus()
  //     getAvgDurationOfTuus()
  //   getAvgDurationOfTuusPerDay()
  // },[])

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
            <BlockOne
              data={avgDurationTuusPerDay}
              dataHours={avgDurationTuusPerDayHours}
              loading={avgDurationTuusPerDayLoading}
            />
          </div>
          <div className='metrics_details_two'>
            <div className='app'>
              <div data-aos='fade-up'>
                <LiveStreak />
              </div>
              <div data-aos='fade-up'>
                <TotalTuus
                  data={totalCountTuus}
                  loading={totalCountTuusLoading}
                />
              </div>
              <div data-aos='fade-up'>
                <CommonTime
                  data={avgDurationTuus}
                  loading={avgDurationTuusLoading}
                />
              </div>
              <div data-aos='fade-up'>
                <AvgBreakTime />
              </div>
              <div data-aos='fade-up'>
                <TotalPerformance
                  data={avgDurationTuus}
                  loading={avgDurationTuusLoading}
                />
              </div>
            </div>
          </div>
          <div className='metrics_details_three' data-aos='fade-up'>
            <BlockThree
              data={numberOfTuusGraph}
              loading={numberOfTuusGraphLoading}
            />
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

New.propTypes = {
  New: PropTypes.object.isRequired,
  getAvgDurationOfTuusPerDay: PropTypes.func.isRequired,
  getTotalNumberOfTuus: PropTypes.func.isRequired,
  getAvgDurationOfTuus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  metrics: state.metrics,
});

const mapStateToActions = {
  getTotalNumberOfTuus,
  getAvgDurationOfTuusPerDay,
  getAvgDurationOfTuus,
};

export default connect(mapStateToProps, mapStateToActions)(New);
