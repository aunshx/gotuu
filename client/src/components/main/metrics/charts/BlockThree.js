import React, { PureComponent, useState } from "react";
import PropTypes from 'prop-types'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import DurationSelector from "../DurationSelector";

import {
  getNumberOfTuusCurrentMonth,
  getNumberOfTuusPerDay,
  getNumberOfTuusYear
} from '../../../../redux/actions/metrics'
import { connect } from "react-redux";
import NothingToShow from "../../NothingToShow";

import windowSize from '../../../../utils/windowSize'

const BlockThree = ({
  data,
  numberOfTuusGraphLoading,
  // Redux Actions
  getNumberOfTuusCurrentMonth,
  getNumberOfTuusPerDay,
  getNumberOfTuusYear,
}) => {
  const { width, height } = windowSize()
  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
    if (e.target.value === "month") {
      getNumberOfTuusCurrentMonth()
    }
    if (e.target.value === "week") {
      getNumberOfTuusPerDay()
    }
    if (e.target.value === "year") {
      getNumberOfTuusYear()
    }
  };
  return (
    <div className='charts'>
      <div className='triple_grid'>
        <div></div>
        <div className='title'>No. of Tuus Completed</div>
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
        {numberOfTuusGraphLoading ? (
          <div className='spinner-graph'></div>
        ) : (
          <>
            {data.length > 0 ? (
              <ResponsiveContainer width='100%' height={width < 480 ? 240 : '100%'}>
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 40,
                    left: 0,
                    bottom: 0,
                  }}
                  barSize={15}
                >
                  <XAxis
                    dataKey='name'
                    scale='point'
                    padding={{ left: 20, right: 20 }}
                    stroke='#44af16'
                    tick={{ fontSize: "0.7em" }}
                  />
                  <YAxis stroke='#44af16' tick={{ fontSize: "0.7em" }} />
                  <Tooltip />
                  <CartesianGrid strokeDasharray='3 3' />
                  <Bar
                    dataKey='value'
                    fill='#b0df9c'
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
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
        Number of Tuus = Total number of tuus completed
      </div>
    </div>
  );
};

BlockThree.propTypes = {
  getNumberOfTuusCurrentMonth: PropTypes.func.isRequired,
  getNumberOfTuusPerDay: PropTypes.func.isRequired,
  getNumberOfTuusYear: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

})

const mapStateToActions = {
  getNumberOfTuusCurrentMonth,
  getNumberOfTuusPerDay,
  getNumberOfTuusYear,
};

export default connect(mapStateToProps, mapStateToActions)(BlockThree);
