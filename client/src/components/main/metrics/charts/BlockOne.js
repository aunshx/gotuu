// A chart for average tuu time in minutes and the number of tuus done per time

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import DurationSelector from "../DurationSelector";
import NothingToShow from "../../NothingToShow";
import { connect } from "react-redux";

import {
  getAvgDurationOfTuusPerDayPerYear,
  getAvgDurationOfTuusPerDayPerMonth,
  getAvgDurationOfTuusPerDay,
} from "../../../../redux/actions/metrics";

import windowSize from "../../../../utils/windowSize";

const BlockOne = ({
  data,
  dataHours,
  loading,
  // Redux Actions
  getAvgDurationOfTuusPerDayPerYear,
  getAvgDurationOfTuusPerDayPerMonth,
  getAvgDurationOfTuusPerDay,
}) => {

  const { width, height } = windowSize();
  const [duration, setDuration] = useState("week");

  const [showHours, setShowHours] = useState(false);

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
    if (e.target.value === "month") {
      getAvgDurationOfTuusPerDayPerMonth();
    }
    if (e.target.value === "week") {
      getAvgDurationOfTuusPerDay();
    }
    if (e.target.value === "year") {
      getAvgDurationOfTuusPerDayPerYear();
    }
  };

  const showTime = (showHours) => {
    if(showHours){
      setShowHours(false)
    } else {
      setShowHours(true);
    }
  };
  return (
    <div className='charts animate__animated animate__bounce'>
      <div className='triple_grid'>
        <div class='switch flex_middle'>
          <div
            className={
              showHours
                ? "button_switch-2 flex_middle ft-bold"
                : "button_switch flex_middle ft-bold"
            }
            onClick={() => showTime(showHours)}
          >
            {showHours ? "h" : "m"}
          </div>
        </div>
        <div className='title'>
          Avg duration of Tuus - <span> {showHours ? "hrs" : "min"} </span>
        </div>
        <div
          className={
            width < 480 ? "flex_middle mrg-b-1" : "flex_right mrg-r-one"
          }
        >
          <DurationSelector
            duration={duration}
            onChangeDuration={onChangeDuration}
          />
        </div>
      </div>
      <div
        style={{
          width: "99%",
          height: "80%",
        }}
        className='flex_middle'
      >
        {loading ? (
          <div className='spinner-graph'></div>
        ) : (
          <>
            {data.length > 0 ? (
              <ResponsiveContainer
                width='100%'
                height={width < 480 ? 240 : "100%"}
              >
                <AreaChart
                  data={showHours ? dataHours : data}
                  margin={{
                    top: 10,
                    right: 50,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='name'
                    stroke='#44af16'
                    tick={{ fontSize: "0.7em" }}
                  />
                  <YAxis stroke='#44af16' tick={{ fontSize: "0.7em" }} />
                  <Tooltip />
                  <Area
                    type='monotone'
                    dataKey='value'
                    stroke='#cacccb'
                    fill='#cacccb'
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <NothingToShow
                primaryMessage={"Graph is empty"}
                secondaryMessage={
                  "Try starting and completing a new Tuu! Or click on 'today' to check previous Tuus!"
                }
              />
            )}
          </>
        )}
      </div>
      <div className='footnote flex_middle'>
        Avg duration = (total duration/number of tuuls)
      </div>
    </div>
  );
};

BlockOne.propTypes = {
  getAvgDurationOfTuusPerDayPerYear: PropTypes.func.isRequired,
  getAvgDurationOfTuusPerDayPerMonth: PropTypes.func.isRequired,
  getAvgDurationOfTuusPerDay: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapStateToActions = {
  getAvgDurationOfTuusPerDayPerYear,
  getAvgDurationOfTuusPerDayPerMonth,
  getAvgDurationOfTuusPerDay,
};

export default connect(mapStateToProps, mapStateToActions)(BlockOne);

