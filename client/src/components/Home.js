import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Navbar from "./navbar/Navbar";
import Main from './main/Main';

import Timeline from './main/timeline/Timeline';
import New from './main/metrics/New';

import { getAvgDurationOfTuus, getAvgDurationOfTuusPerDay, getTotalNumberOfTuus } from '../redux/actions/metrics';

const Home = ({
  auth: { isAuthenticated },
  // Redux Actions
  getAvgDurationOfTuus,
  getAvgDurationOfTuusPerDay,
  getTotalNumberOfTuus,
}) => {
  //   useEffect(() => {
  //       getTotalNumberOfTuus()
  //     getAvgDurationOfTuus()
  //   getAvgDurationOfTuusPerDay()
  // },[])

  const [isActive, setIsActive] = useState(false);

  const goMain = useRef();

  const goToMain = () => {
    goMain.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar goMain={goMain} isActive={isActive} />
      <div className='home'>
        <Main isActive={isActive} setIsActive={setIsActive} />
        {isAuthenticated && <Timeline goToMain={goToMain} />}
        {isAuthenticated && <New goToMain={goToMain} />}
      </div>
    </>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  getAvgDurationOfTuus: PropTypes.func.isRequired,
  getAvgDurationOfTuusPerDay:PropTypes.func.isRequired,
  getTotalNumberOfTuus:PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionsToProps = {
  getAvgDurationOfTuus,
  getAvgDurationOfTuusPerDay,
  getTotalNumberOfTuus,
};

export default connect(mapStateToProps, mapActionsToProps)(Home);