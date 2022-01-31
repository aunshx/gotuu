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

const BlockOne = ({
  data,
  dataHours,
  loading,
  // Redux Actions
  getAvgDurationOfTuusPerDayPerYear,
  getAvgDurationOfTuusPerDayPerMonth,
  getAvgDurationOfTuusPerDay,
}) => {
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

  const showTime = () => {
    setShowHours(!showHours);
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
            onClick={showTime}
          >
            {showHours ? "h" : "m"}
          </div>
        </div>
        <div className='title'>
          Avg duration of Tuus - <span> {showHours ? "hrs" : "min"} </span>
        </div>
        <div className='flex_right mrg-r-one'>
          <DurationSelector
            duration={duration}
            onChangeDuration={onChangeDuration}
          />
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: "80%",
        }}
        className='flex_middle'
      >
        {loading ? (
          <div className='spinner-graph'></div>
        ) : (
          <>
            {data.length > 0 ? (
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart
                  width={500}
                  height={400}
                  data={showHours ? dataHours : data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray='3 3' />
                  <XAxis
                    dataKey='name'
                    stroke='#44af16'
                    tick={{ fontSize: "0.85em" }}
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

