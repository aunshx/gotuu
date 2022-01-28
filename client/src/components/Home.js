import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./Navbar";
import Main from './main/Main';
import Timeline from './main/timeline/Timeline';

const Home = (props) => {

  const goMain = useRef();

  const goToMain = () => {
    goMain.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar goMain={goMain} />
      <div className='home'>
        <Main />
        <Timeline goToMain={goToMain} />
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
