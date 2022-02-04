import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import Navbar from "./navbar/Navbar";
import Main from './main/Main';

import Timeline from './main/timeline/Timeline';
import New from './main/metrics/New';

import { getAvgDurationOfTuus, getAvgDurationOfTuusPerDay, getTotalNumberOfTuus } from '../redux/actions/metrics';
import { useCallback } from 'react';
import Footer from './layout/Footer';

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

  let checker = useRef();

  const refElement = useCallback((node) => {
    if (checker.current) {
      checker.current.disconnect();
    }
    const options = {
      root: null,
      threshold: 0,
    };
    checker.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setFixedContent(true);
      } else {
        setFixedContent(false);
      }
    }, options);
    if (node) {
      checker.current.observe(node);
    }
  }, []);

      const [fixedContent, setFixedContent] = useState(false);

  let checker2 = useRef();

  const refElement2 = useCallback((node) => {
    if (checker2.current) {
      checker2.current.disconnect();
    }
    const options = {
      root: null,
      threshold: 0.1,
    };
    checker2.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setFixedContent2(true);
      } else {
        setFixedContent2(false);
      }
    }, options);
    if (node) {
      checker2.current.observe(node);
    }
  }, []);

  const [fixedContent2, setFixedContent2] = useState(false);

  const goMain = useRef();

  const goToMain = () => {
    goMain.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar goMain={goMain} isActive={isActive} />
      <div className='home'>
        <Main isActive={isActive} setIsActive={setIsActive} />
        {isAuthenticated && (
          <div ref={refElement}>
            <Timeline goToMain={goToMain} fixedContent={fixedContent} />
          </div>
        )}
        {isAuthenticated && (
          <div ref={refElement2}>
            <New goToMain={goToMain} fixedContent2={fixedContent2} />
          </div>
        )}
      </div>
      <Footer />
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