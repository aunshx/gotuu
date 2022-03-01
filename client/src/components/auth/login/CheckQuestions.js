import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TextField, styled, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CheckIcon from "@mui/icons-material/Check";

import Navbar from '../../navbar/Navbar'

import {
  checkSecurityAnswers,
} from "../../../redux/actions/auth";
import windowSize from "../../../utils/windowSize";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  "& label.Mui-focused": {
    color: "#44af16",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    color: "black",
    "&.Mui-focused fieldset": {
      borderColor: "#44af16",
      fontSize: "0.9em",
    },
  },
}));

const CssTextFieldDark = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: "#44af16",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "white",
      fontSize: "0.9em",
    },
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    color: "white",
  },
}));

const textFieldInputLabelStyle = {
  fontSize: "0.9em",
  alignSelf: "center",
  justifySelf: "center",
};

const textFieldInputLabelStyleDark = {
  fontSize: "0.9em",
  alignSelf: "center",
  justifySelf: "center",
  color: "gray",
};

const textFieldStyle = {
  height: "20px",
  width: "230px",
  fontsize: "10px",
};

const loginIconButtonStyle = makeStyles({
  root: {
    color: "#158ed4",
    border: "1px solid #158ed4",
    backgroundColor: "none",
    fontSize: "10px",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#0dba4d",
      border: "1px solid #0dba4d",
    },
  },
});

const useStyles = makeStyles({
  customTextField: {
    "& input::placeholder": {
      color: "grey",
    },
  },
});

const CheckQuestions = ({
  goChangePass2ToChangePass,
  goChangePass2ToChangePass3,
  //   Redux Actions
  checkSecurityAnswers,
  resetSecurityAnswersCheck,
  //   Redux States
  auth: {
    checkSecurityAnswersLoading,
    securityQuestionOne,
    securityQuestionTwo,
    securityQuestionThree,
    emailChangePassword,
    securityAnswersVerified,
  },
  settings: { displayMode },
}) => {
  const {width} = windowSize()
  const iconButtonStyle = loginIconButtonStyle();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    securityQuestionOneAnswer: "",
    securityQuestionTwoAnswer: "",
    securityQuestionThreeAnswer: "",
  });

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

  const {
    securityQuestionOneAnswer,
    securityQuestionTwoAnswer,
    securityQuestionThreeAnswer,
  } = formData;

  const goBack = () => {
      setFormData({
        ...formData,
        securityQuestionOneAnswer: "",
        securityQuestionTwoAnswer: "",
        securityQuestionThreeAnswer: "",
      });
      goChangePass2ToChangePass()
  }

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    if (securityQuestionOneAnswer.length === 0) {
      setSecurityQuestionOneAnswerEmptyError(true);
      setTimeout(() => setSecurityQuestionOneAnswerEmptyError(false), 5000);
    } else if (securityQuestionTwoAnswer.length === 0) {
      setSecurityQuestionTwoAnswerEmptyError(true);
      setTimeout(() => setSecurityQuestionTwoAnswerEmptyError(false), 5000);
    } else if (securityQuestionThreeAnswer.length === 0) {
      setSecurityQuestionThreeAnswerEmptyError(true);
      setTimeout(() => setSecurityQuestionThreeAnswerEmptyError(false), 5000);
    } else {
        checkSecurityAnswers(
          securityQuestionOneAnswer,
          securityQuestionTwoAnswer,
          securityQuestionThreeAnswer,
        securityQuestionOne,
          securityQuestionTwo,
          securityQuestionThree,
              emailChangePassword
            );
    }
  };

  return (
    <>
      <div className={width < 476 ? "login login-extra-big flex_middle" : "login flex_middle"}>
        <div className='login-back'></div>
        {displayMode ? (
          <div className='card'>
            <div className='title ft-bold' style={{ marginTop: "0.5em" }}>
              Change Password
            </div>
            <div
              className='details'
              style={{ color: "grey", padding: "0 1em" }}
            >
              Answer correctly to your security questions to proceed.
            </div>
            <div className='app'>
              {(securityQuestionOneAnswerEmptyError ||
                securityQuestionTwoAnswerEmptyError ||
                securityQuestionThreeAnswerEmptyError) && (
                <div className='errors-security'>Answers cannot be empty</div>
              )}
              {!securityQuestionOneAnswerEmptyError &&
                !securityQuestionTwoAnswerEmptyError &&
                !securityQuestionThreeAnswerEmptyError && (
                  <div className='errors-hidden-security'>.</div>
                )}
            </div>
            <div style={{ marginBottom: "1em" }}>
              <div style={{ marginBottom: "2em" }}>
                <div style={{ marginBottom: "1.5em" }}>
                  <CssTextField
                    placeholder='Question One'
                    name='securityQuestionOne'
                    value={securityQuestionOne}
                    onChange={onChange}
                    size='small'
                    focusColor='#1686f0'
                    classes={{ input: classes.customTextField }}
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.8em",
                        padding: "0 0 0.2em 0",
                        color: "#636362",
                      },
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  ></CssTextField>
                </div>
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextField
                    error={securityQuestionOneAnswerEmptyError}
                    label='Answer One'
                    placeholder='Answer One'
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    inputProps={{
                      style: textFieldStyle,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.9em",
                        color: "#636362",
                      },
                    }}
                    FormHelperTextProps={{
                      style: {
                        margin: 0,
                        padding: "0 0 0 5px",
                        fontSize: 10,
                      },
                    }}
                    name='securityQuestionOneAnswer'
                    value={securityQuestionOneAnswer}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "2em" }}>
                <div
                  style={{ marginBottom: "1.5em" }}
                  className='security-question'
                >
                  <CssTextField
                    placeholder='Question One'
                    name='securityQuestionTwo'
                    value={securityQuestionTwo}
                    onChange={onChange}
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.8em",
                        padding: "0 0 0.2em 0",
                        color: "#636362",
                      },
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  ></CssTextField>
                </div>
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextField
                    error={securityQuestionOneAnswerEmptyError}
                    label='Answer Two'
                    placeholder='Answer Two'
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    inputProps={{
                      style: textFieldStyle,
                    }}
                    FormHelperTextProps={{
                      style: {
                        margin: 0,
                        padding: "0 0 0 5px",
                        fontSize: 10,
                      },
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.9em",
                        color: "#636362",
                      },
                    }}
                    name='securityQuestionTwoAnswer'
                    value={securityQuestionTwoAnswer}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "2em" }}>
                <div
                  style={{ marginBottom: "1.5em" }}
                  className='security-question'
                >
                  <CssTextField
                    placeholder='Question Three'
                    name='securityQuestionThree'
                    value={securityQuestionThree}
                    onChange={onChange}
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.8em",
                        padding: "0 0 0.2em 0",
                        color: "#636362",
                      },
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  ></CssTextField>
                </div>
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextField
                    error={securityQuestionOneAnswerEmptyError}
                    label='Answer Three'
                    placeholder='Answer Three'
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    inputProps={{
                      style: textFieldStyle,
                    }}
                    FormHelperTextProps={{
                      style: {
                        margin: 0,
                        padding: "0 0 0 5px",
                        fontSize: 10,
                      },
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.9em",
                        color: "#636362",
                      },
                    }}
                    name='securityQuestionThreeAnswer'
                    value={securityQuestionThreeAnswer}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div>
                {securityAnswersVerified ? (
                  <Button
                    size='small'
                    disabled={securityAnswersVerified}
                    loadingPosition='end'
                    endIcon={
                      <CheckIcon
                        style={{
                          fontSize: 12,
                          color: "green",
                        }}
                      />
                    }
                    variant='outlined'
                    className={iconButtonStyle.root}
                    style={{
                      border: "1px solid green",
                    }}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        color: "green",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Checked
                    </div>
                  </Button>
                ) : (
                  <LoadingButton
                    size='small'
                    loading={checkSecurityAnswersLoading}
                    loadingPosition='end'
                    endIcon={
                      <DoubleArrowIcon
                        style={{
                          fontSize: 12,
                        }}
                      />
                    }
                    variant='outlined'
                    onClick={onSubmit}
                    className={iconButtonStyle.root}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Check
                    </div>
                  </LoadingButton>
                )}
              </div>
              <div
                className='flex_evenly'
                style={{ marginTop: "2em", marginBottom: "2em" }}
              >
                <div>
                  <Button
                    size='small'
                    loadingPosition='end'
                    startIcon={
                      <ArrowBackIosIcon
                        style={{
                          fontSize: 12,
                        }}
                      />
                    }
                    variant='outlined'
                    onClick={goBack}
                    className={iconButtonStyle.root}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Previous
                    </div>
                  </Button>
                </div>
                <div>
                  <Button
                    size='small'
                    disabled={!securityAnswersVerified}
                    loadingPosition='end'
                    endIcon={
                      <ArrowForwardIosIcon
                        style={{
                          fontSize: 12,
                        }}
                      />
                    }
                    variant='outlined'
                    onClick={goChangePass2ToChangePass3}
                    className={iconButtonStyle.root}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Next
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className='card'>
            <div className='title ft-bold' style={{ marginTop: "0.5em" }}>
              Change Password
            </div>
            <div className='details' style={{ padding: "0 1em" }}>
              Answer correctly to your security questions to proceed.
            </div>
            <div className='app'>
              {(securityQuestionOneAnswerEmptyError ||
                securityQuestionTwoAnswerEmptyError ||
                securityQuestionThreeAnswerEmptyError) && (
                <div className='errors-security'>Answers cannot be empty</div>
              )}
              {!securityQuestionOneAnswerEmptyError &&
                !securityQuestionTwoAnswerEmptyError &&
                !securityQuestionThreeAnswerEmptyError && (
                  <div
                    className='errors-hidden-security'
                    style={{ color: "black", cursor: "context-menu" }}
                  >
                    .
                  </div>
                )}
            </div>
            <div style={{ marginBottom: "1em" }}>
              <div style={{ marginBottom: "2em" }}>
                <div style={{ marginBottom: "1.5em" }}>
                  <CssTextFieldDark
                    placeholder='Question One'
                    name='securityQuestionOne'
                    value={securityQuestionOne}
                    onChange={onChange}
                    size='small'
                    focusColor='#1686f0'
                    classes={{ input: classes.customTextField }}
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.8em",
                        padding: "0 0 0.2em 0",
                        color: "#636362",
                      },
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  ></CssTextFieldDark>
                </div>
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextFieldDark
                    error={securityQuestionOneAnswerEmptyError}
                    label='Answer One'
                    placeholder='Answer One'
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    inputProps={{
                      style: textFieldStyle,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.9em",
                        color: "#636362",
                      },
                    }}
                    FormHelperTextProps={{
                      style: {
                        margin: 0,
                        padding: "0 0 0 5px",
                        fontSize: 10,
                      },
                    }}
                    name='securityQuestionOneAnswer'
                    value={securityQuestionOneAnswer}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "2em" }}>
                <div
                  style={{ marginBottom: "1.5em" }}
                  className='security-question'
                >
                  <CssTextFieldDark
                    placeholder='Question One'
                    name='securityQuestionTwo'
                    value={securityQuestionTwo}
                    onChange={onChange}
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.8em",
                        padding: "0 0 0.2em 0",
                        color: "#636362",
                      },
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  ></CssTextFieldDark>
                </div>
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextFieldDark
                    error={securityQuestionOneAnswerEmptyError}
                    label='Answer Two'
                    placeholder='Answer Two'
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    inputProps={{
                      style: textFieldStyle,
                    }}
                    FormHelperTextProps={{
                      style: {
                        margin: 0,
                        padding: "0 0 0 5px",
                        fontSize: 10,
                      },
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.9em",
                        color: "#636362",
                      },
                    }}
                    name='securityQuestionTwoAnswer'
                    value={securityQuestionTwoAnswer}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div style={{ marginBottom: "2em" }}>
                <div
                  style={{ marginBottom: "1.5em" }}
                  className='security-question'
                >
                  <CssTextFieldDark
                    placeholder='Question Three'
                    name='securityQuestionThree'
                    value={securityQuestionThree}
                    onChange={onChange}
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.8em",
                        padding: "0 0 0.2em 0",
                        color: "#636362",
                      },
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  ></CssTextFieldDark>
                </div>
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextFieldDark
                    error={securityQuestionOneAnswerEmptyError}
                    label='Answer Three'
                    placeholder='Answer Three'
                    size='small'
                    focusColor='#1686f0'
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    inputProps={{
                      style: textFieldStyle,
                    }}
                    FormHelperTextProps={{
                      style: {
                        margin: 0,
                        padding: "0 0 0 5px",
                        fontSize: 10,
                      },
                    }}
                    InputProps={{
                      style: {
                        fontSize: "0.9em",
                        color: "#636362",
                      },
                    }}
                    name='securityQuestionThreeAnswer'
                    value={securityQuestionThreeAnswer}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div>
                {securityAnswersVerified ? (
                  <Button
                    size='small'
                    disabled={securityAnswersVerified}
                    loadingPosition='end'
                    endIcon={
                      <CheckIcon
                        style={{
                          fontSize: 12,
                          color: "green",
                        }}
                      />
                    }
                    variant='outlined'
                    className={iconButtonStyle.root}
                    style={{
                      border: "1px solid green",
                    }}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        color: "green",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Checked
                    </div>
                  </Button>
                ) : (
                  <LoadingButton
                    size='small'
                    loading={checkSecurityAnswersLoading}
                    loadingPosition='end'
                    endIcon={
                      <DoubleArrowIcon
                        style={{
                          fontSize: 12,
                        }}
                      />
                    }
                    variant='outlined'
                    onClick={onSubmit}
                    className={iconButtonStyle.root}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Check
                    </div>
                  </LoadingButton>
                )}
              </div>
              <div
                className='flex_evenly'
                style={{ marginTop: "2em", marginBottom: "2em" }}
              >
                <div>
                  <Button
                    size='small'
                    loadingPosition='end'
                    startIcon={
                      <ArrowBackIosIcon
                        style={{
                          fontSize: 12,
                        }}
                      />
                    }
                    variant='outlined'
                    onClick={goChangePass2ToChangePass}
                    className={iconButtonStyle.root}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Previous
                    </div>
                  </Button>
                </div>
                <div>
                  <Button
                    size='small'
                    disabled={!securityAnswersVerified}
                    loadingPosition='end'
                    endIcon={
                      <ArrowForwardIosIcon
                        style={{
                          fontSize: 12,
                        }}
                      />
                    }
                    variant='outlined'
                    onClick={goChangePass2ToChangePass3}
                    className={iconButtonStyle.root}
                  >
                    <div
                      style={{
                        margin: "0em 0.5em 0em 0em",
                        borderColor: "green",
                        fontSize: "11px",
                      }}
                    >
                      Next
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

CheckQuestions.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  checkSecurityAnswers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

const mapStateToActions = {
  checkSecurityAnswers,
};

export default connect(mapStateToProps, mapStateToActions)(CheckQuestions);
