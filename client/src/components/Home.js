import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./Navbar";
import Main from './main/Main';
import Timeline from './main/timeline/Timeline';

const Home = (props) => {
  return <>
    <Navbar />
    <div className="home">
      <Main />
      <Timeline />
    </div>
  </>;
};

Home.propTypes = {};

export default Home;
