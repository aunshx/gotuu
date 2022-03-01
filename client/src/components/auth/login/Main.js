import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import CheckEmail from './CheckEmail';
import CheckQuestions from "./CheckQuestions";
import Login from "./Login";

import store from '../../../store';
import { DARK_MODE, LIGHT_MODE, } from '../../../redux/actions/types';
import {
  resetVerifyEmail,
  resetSecurityAnswersCheck,
  resetChangePassword,
  setCountLogin,
} from "../../../redux/actions/auth";
import ChangePassword from './ChangePassword';
import Navbar from '../../navbar/Navbar';
import { Redirect } from 'react-router-dom';

const Main = ({
  // Redux Actions
  resetVerifyEmail,
  resetSecurityAnswersCheck,
  resetChangePassword,
  setCountLogin,
  // Redux States
  auth: { isAuthenticated, count },
}) => {

  useEffect(() => {
    if (localStorage.theme === "dark") {
      console.log(localStorage.theme);
      store.dispatch({
        type: DARK_MODE,
      });
      localStorage.setItem("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    }

    if (localStorage.theme === "light") {
      store.dispatch({
        type: LIGHT_MODE,
      });
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const goLoginToChangePass = () => {
    setCountLogin(1)
  };

  const goChangePassToLogin = () => {
    setCountLogin(0)
    resetVerifyEmail();
  };

  const goChangePassToChangePass2 = () => {
    setCountLogin(2)
  };

  const goChangePass2ToChangePass = () => {
    setCountLogin(1)
    resetSecurityAnswersCheck();
  };

  const goChangePass2ToChangePass3 = () => {
    setCountLogin(3)
  };

  const goChangePass3ToChangePass2 = () => {
    setCountLogin(2)
  };

  const goChangePass3ToLogin = () => {
    setCountLogin(0)
    resetVerifyEmail();
    resetSecurityAnswersCheck();
    resetChangePassword()
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Navbar />
      {count === 0 && <Login goLoginToChangePass={goLoginToChangePass} />}
      {count === 1 && (
        <CheckEmail
          goChangePassToLogin={goChangePassToLogin}
          goChangePassToChangePass2={goChangePassToChangePass2}
        />
      )}
      {count === 2 && (
        <CheckQuestions
          goChangePass2ToChangePass={goChangePass2ToChangePass}
          goChangePass2ToChangePass3={goChangePass2ToChangePass3}
          setCount={setCountLogin}
        />
      )}
      {count === 3 && (
        <ChangePassword
          goChangePass3ToChangePass2={goChangePass3ToChangePass2}
          goChangePass3ToLogin={goChangePass3ToLogin}
          setCount={setCountLogin}
        />
      )}
    </>
  );
};

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  resetVerifyEmail: PropTypes.func.isRequired,
  resetSecurityAnswersCheck: PropTypes.func.isRequired,
  resetChangePassword: PropTypes.func.isRequired,
  setCountLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapStateToActions = {
  resetVerifyEmail,
  resetSecurityAnswersCheck,
  resetChangePassword,
  setCountLogin,
};

export default connect(mapStateToProps, mapStateToActions)(Main);
