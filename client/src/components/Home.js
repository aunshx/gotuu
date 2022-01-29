import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Navbar from "./navbar/Navbar";
import Main from './main/Main';
import Timeline from './main/timeline/Timeline';
import Metrics from './main/metrics/Metrics';

const Home = ({ auth: { isAuthenticated } }) => {

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
        {isAuthenticated && <Timeline goToMain={goToMain} /> }
        {isAuthenticated && <Metrics goToMain={goToMain} /> }
      </div>
    </>
  );
};

Home.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(Home);