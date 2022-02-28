import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Navbar from "../../navbar/Navbar";
import Alerts from "../../layout/Alerts";

import logoRes from "../../../resources/images/registerBackground.png";

import {
  register
} from '../../../redux/actions/auth'
import RegisterFirst from './RegisterFirst';
import RegisterSecurity from './RegisterSecurity';


const Register = ({
  // Redux Actions
  register,
  // Redux State
  auth: { isAuthenticated },
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    showPassword: false,
    securityQuestionOne: '',
    securityQuestionTwo: '',
    securityQuestionThree: '',
    securityQuestionOneAnswer: '',
    securityQuestionTwoAnswer: '',
    securityQuestionThreeAnswer: '',
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const [nameEmptyError, setNameEmptyError] = useState(false);
  const [emailEmptyError, setEmailEmptyError] = useState(false);
  const [
    securityQuestionOneAnswerEmptyError,
    setSecurityQuestionOneAnswerEmptyError,
  ] = useState(false);
  const [
    securityQuestionTwoAnswerEmptyError,
    setSecurityQuestionTwoAnswerEmptyError,
  ] = useState(false);
  const [
    securityQuestionThreeAnswerEmptyError,
    setSecurityQuestionThreeAnswerEmptyError,
  ] = useState(false);
  const [securityQuestionOneEmptyError, setSecurityQuestionOneEmptyError] = useState(false)
  const [securityQuestionTwoEmptyError, setSecurityQuestionTwoEmptyError] = useState(false)
  const [securityQuestionThreeEmptyError, setSecurityQuestionThreeEmptyError] = useState(false)
  const [step, setStep] = useState(0)

  const {
    name,
    email,
    password,
    showPassword,
    securityQuestionOne,
    securityQuestionTwo,
    securityQuestionThree,
    securityQuestionOneAnswer,
    securityQuestionTwoAnswer,
    securityQuestionThreeAnswer,
  } = formData;

  const showChange = () => {
    setShowChangePassword(true);
  };

  const decreaseStep = () => {
    setStep(0)
  }

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !showPassword,
    });
  };

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

   if (securityQuestionOneEmptyError.length === 0) {
      setSecurityQuestionOneEmptyError(true);
      setTimeout(() => setSecurityQuestionOneEmptyError(false), 5000);
    } 
    else if (securityQuestionTwoEmptyError.length === 0) {
      setSecurityQuestionTwoEmptyError(true);
      setTimeout(() => setSecurityQuestionTwoEmptyError(false), 5000);
    }
    else if (securityQuestionThreeEmptyError.length === 0) {
      setSecurityQuestionThreeEmptyError(true);
      setTimeout(() => setSecurityQuestionThreeEmptyError(false), 5000);
    } else if (securityQuestionOneAnswer.length === 0) {
      setSecurityQuestionOneAnswerEmptyError(true);
      setTimeout(() => setSecurityQuestionOneAnswerEmptyError(false), 5000);
    } else if (securityQuestionTwoAnswer.length === 0) {
      setSecurityQuestionTwoAnswerEmptyError(true);
      setTimeout(() => setSecurityQuestionTwoAnswerEmptyError(false), 5000);
    } else if (securityQuestionThreeAnswer.length === 0) {
      setSecurityQuestionThreeAnswerEmptyError(true);
      setTimeout(() => setSecurityQuestionThreeAnswerEmptyError(false), 5000);
    } else {
      register(
        name,
        email,
        password,
        securityQuestionOne,
        securityQuestionTwo,
        securityQuestionThree,
        securityQuestionOneAnswer,
        securityQuestionTwoAnswer,
        securityQuestionThreeAnswer
      );
    }
  };

  const increaseStep = () => {
      // if (name.length === 0) {
      //   setNameEmptyError(true);
      //   setTimeout(() => setNameEmptyError(false), 5000);
      // } else if (email.length === 0) {
      //   setEmailEmptyError(true);
      //   setTimeout(() => setEmailEmptyError(false), 5000);
      // } else if (password.length === 0) {
      //   setPasswordEmptyError(true);
      //   setTimeout(() => setPasswordEmptyError(false), 5000);
      // } else {
            setStep(1);
      // }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Navbar />
      <div className='app'>
        <div className='register'>
          <div className='register_one flex_end'>
            <div>
              <div className='register_welcome flex_middle'>
                Welcome to Gotuu!
              </div>
              <div className='register_welcome_title flex_middle'>
                More focus. Less pocus.
              </div>
            </div>
          </div>
          <div className='register_two flex_left'>
            <img src={logoRes} alt='register background' />
          </div>
          <div className='register_three flex_left'>
            {step === 0 && (
              <RegisterFirst
                onSubmit={onSubmit}
                onChange={onChange}
                handleClickShowPassword={handleClickShowPassword}
                showChange={showChange}
                showChangePassword={showChangePassword}
                passwordEmptyError={passwordEmptyError}
                nameEmptyError={nameEmptyError}
                emailEmptyError={emailEmptyError}
                showPassword={showPassword}
                name={name}
                email={email}
                password={password}
                increaseStep={increaseStep}
              />
            )}
            {step === 1 && (
              <RegisterSecurity
                onSubmit={onSubmit}
                onChange={onChange}
                securityQuestionOneAnswerEmptyError={
                  securityQuestionOneAnswerEmptyError
                }
                securityQuestionTwoAnswerEmptyError={
                  securityQuestionTwoAnswerEmptyError
                }
                securityQuestionThreeAnswerEmptyError={
                  securityQuestionThreeAnswerEmptyError
                }
                securityQuestionOne={securityQuestionOne}
                securityQuestionTwo={securityQuestionTwo}
                securityQuestionThree={securityQuestionThree}
                securityQuestionOneAnswer={securityQuestionOneAnswer}
                securityQuestionTwoAnswer={securityQuestionTwoAnswer}
                securityQuestionThreeAnswer={securityQuestionThreeAnswer}
                decreaseStep={decreaseStep}
                securityQuestionOneEmptyError={securityQuestionOneEmptyError}
                securityQuestionTwoEmptyError={securityQuestionTwoEmptyError}
                securityQuestionThreeEmptyError={
                  securityQuestionThreeEmptyError
                }
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <Alerts />
      </div>
    </>
  );
};

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  snackbar: state.snackbar
});

const mapStateToActions = {
  register,
};

export default connect(mapStateToProps, mapStateToActions)(Register);
