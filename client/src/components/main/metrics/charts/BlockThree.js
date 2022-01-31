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

const BlockThree = ({
  data,
  numberOfTuusGraphLoading,
  // Redux Actions
  getNumberOfTuusCurrentMonth,
  getNumberOfTuusPerDay,
  getNumberOfTuusYear,
}) => {
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
      >
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 0,
            }}
            barSize={15}
          >
            <XAxis
              dataKey='name'
              scale='point'
              padding={{ left: 10, right: 10 }}
              stroke='#44af16'
            />
            <YAxis stroke='#44af16' />
            <Tooltip />
            <CartesianGrid strokeDasharray='3 3' />
            <Bar dataKey='value' fill='#b0df9c' background={{ fill: "#eee" }} />
          </BarChart>
        </ResponsiveContainer>
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
