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

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const BlockThree = () => {
    const [duration, setDuration] = useState("week");

    const onChangeDuration = (e) => {
      setDuration(e.target.value);
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
              <Bar dataKey='pv' fill='#b0df9c' background={{ fill: "#eee" }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className='footnote flex_middle'>
          Number of Tuus = Total number of tuus completed
        </div>
      </div>
    );
}

BlockThree.propTypes = {};

export default BlockThree;
