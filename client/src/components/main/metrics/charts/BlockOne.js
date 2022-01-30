// A chart for average tuu time in minutes and the number of tuus done per time

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import DurationSelector from "../DurationSelector";

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BlockOne = ({ }) => {
  const [duration, setDuration] = useState("week");

  const onChangeDuration = (e) => {
    setDuration(e.target.value);
  };
  return (
        <div
          className='charts animate__animated animate__bounce'
        >
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
                <XAxis dataKey='name' stroke='#44af16' />
                <YAxis stroke='#44af16' />
                <Tooltip />
                <Area
                  type='monotone'
                  dataKey='uv'
                  stroke='#cacccb'
                  fill='#cacccb'
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className='footnote flex_middle'>
            Avg duration = (total duration/number of tuuls)
          </div>
        </div>
  );
};

BlockOne.propTypes = {};

export default BlockOne;

