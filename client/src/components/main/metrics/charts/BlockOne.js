// A chart for average tuu time in minutes and the number of tuus done per time

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import DurationSelector from "../DurationSelector";

const BlockOne = ({ data, getAvgDurationOfTuusPerDay }) => {
  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  return (
    <div className='charts animate__animated animate__bounce'>
      <div className='triple_grid'>
        <div></div>
        <div className='title'>Avg duration of Tuus</div>
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
        {data.length > 0 && (
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              width={500}
              height={400}
              data={data}
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
        )}
      </div>
      <div className='footnote flex_middle'>
        Avg duration = (total duration/number of tuuls)
      </div>
    </div>
  );
};

BlockOne.propTypes = {};

export default BlockOne;

