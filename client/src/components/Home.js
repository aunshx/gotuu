import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom } from "@fortawesome/free-solid-svg-icons";

import Navbar from "./navbar/Navbar";
import Main from './main/Main';
import Timeline from './main/timeline/Timeline';

const Home = (props) => {

  const [isActive, setIsActive] = useState(false)

  const goMain = useRef();

  const goToMain = () => {
    goMain.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar goMain={goMain} isActive={isActive} />
      <div className='home'>
        <Main isActive={isActive} setIsActive={setIsActive} />
        <Timeline goToMain={goToMain} />
      </div>
    </>
  );
};

Home.propTypes = {};

export default Home;
