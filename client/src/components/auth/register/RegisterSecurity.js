import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { TextField, styled, MenuItem, FormControl } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { securityQuestions } from "../securityQuestions";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  "& label.Mui-focused": {
    color: "#44af16",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    color: 'black',
    "&.Mui-focused fieldset": {
      borderColor: "#44af16",
      fontSize: "0.9em",
    },
  },
}));

const textFieldInputLabelStyle = {
  fontSize: "0.9em",
  alignSelf: "center",
  justifySelf: "center",
};

const textFieldStyle = {
  height: "20px",
  width: "230px",
  fontsize: '10px'
};

const loginIconButtonStyle = makeStyles({
  root: {
    color: "gray",
    border: "1px solid green",
    backgroundColor: "none",
    fontSize: "10px",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#1686f0",
      border: "1px solid #1686f0",
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

const RegisterSecond = ({
    onSubmit,
    onChange,
    securityQuestionOneAnswerEmptyError,
    securityQuestionTwoAnswerEmptyError,
    securityQuestionThreeAnswerEmptyError,
  securityQuestionOne,
  securityQuestionTwo,
  securityQuestionThree,
  securityQuestionOneAnswer,
  securityQuestionTwoAnswer,
  securityQuestionThreeAnswer,
  decreaseStep,
  securityQuestionOneEmptyError,
  securityQuestionTwoEmptyError,
  securityQuestionThreeEmptyError,
  //   Redux States
  snackbar: { errorSnackbar },
  //   Redux Actions
  auth: { loginLoading },
}) => {
  const iconButtonStyle = loginIconButtonStyle();
  const classes = useStyles();

  return (
    <div>
      <div className='card'>
        <div className='title ft-bold' style={{ marginTop: "0.5em" }}>
          Register
        </div>
        <div className='details'>
          Select 3 questions and note their answers. This will be useful during
          password change.
        </div>
        <div className='app'>
          {(securityQuestionOneEmptyError ||
            securityQuestionTwoEmptyError ||
            securityQuestionThreeEmptyError) && (
            <div className='errors-security'>Questions cannot be empty</div>
          )}
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
              <FormControl>
                <CssTextField
                  defaultValue={securityQuestionOne}
                  select
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
                    disableUnderline: true,
                  }}
                  sx={{
                    height: "20px",
                    width: "257px",
                  }}
                >
                  {securityQuestions.length > 0 &&
                    securityQuestions.map((element, index) => (
                      <MenuItem
                        style={{
                          fontSize: "0.8em",
                          height: "20px",
                          margin: "0.3em",
                          color: "grey",
                        }}
                        disbaled={
                          element === securityQuestionTwo ||
                          element === securityQuestionThree
                        }
                        value={element}
                        key={index}
                      >
                        {element}
                      </MenuItem>
                    ))}
                </CssTextField>
              </FormControl>
            </div>
            {securityQuestionOne.length !== 0 && (
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextField
                    error={errorSnackbar || securityQuestionOneAnswerEmptyError}
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
              )}
          </div>
          {securityQuestionOneAnswer.length !== 0 && (
            <div style={{ marginBottom: "2em" }}>
              <div
                style={{ marginBottom: "1.5em" }}
                className='security-question'
              >
                <FormControl>
                  <CssTextField
                    select
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
                      disableUnderline: true,
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  >
                    {securityQuestions.length > 0 &&
                      securityQuestions.map((element, index) => (
                        <MenuItem
                          style={{
                            fontSize: "0.8em",
                            height: "20px",
                            margin: "0.3em",
                            color: "grey",
                          }}
                          value={element}
                          key={index}
                          disabled={
                            element === securityQuestionOne ||
                            element === securityQuestionThree
                          }
                        >
                          {element}
                        </MenuItem>
                      ))}
                  </CssTextField>
                </FormControl>
              </div>
              {(securityQuestionTwo.length !== 0) && (
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextField
                    error={errorSnackbar || securityQuestionOneAnswerEmptyError}
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
              )}
            </div>
          )}
          {securityQuestionTwoAnswer.length !== 0 && (
            <div style={{ marginBottom: "2em" }}>
              <div
                style={{ marginBottom: "1.5em" }}
                className='security-question'
              >
                <FormControl>
                  <CssTextField
                    select
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
                      disableUnderline: true,
                    }}
                    sx={{
                      height: "20px",
                      width: "257px",
                    }}
                  >
                    {securityQuestions.length > 0 &&
                      securityQuestions.map((element, index) => (
                        <MenuItem
                          style={{
                            fontSize: "0.8em",
                            height: "20px",
                            margin: "0.3em",
                            color: "grey",
                          }}
                          value={element}
                          key={index}
                          disabled={
                            element === securityQuestionOne ||
                            element === securityQuestionTwo
                          }
                        >
                          {element}
                        </MenuItem>
                      ))}
                  </CssTextField>
                </FormControl>
              </div>
              {securityQuestionThree.length !== 0 && (
                <div
                  style={{ marginBottom: "1.3em" }}
                  className='security-question-answer'
                >
                  <CssTextField
                    error={errorSnackbar || securityQuestionOneAnswerEmptyError}
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
              )}
            </div>
          )}
          <div className='flex_between' style={{ padding: "0 1.2em" }}>
            <div>
              <LoadingButton
                size='small'
                startIcon={
                  <ArrowBackIosIcon
                    style={{
                      fontSize: 12,
                      color: "green",
                    }}
                  />
                }
                variant='outlined'
                onClick={decreaseStep}
                className={iconButtonStyle.root}
              >
                <div
                  style={{
                    margin: "0em 0.5em 0em 0em",
                    color: "green",
                    borderColor: "green",
                  }}
                >
                  Back
                </div>
              </LoadingButton>
            </div>
            <div>
              <LoadingButton
                size='small'
                loading={loginLoading}
                loadingPosition='end'
                endIcon={
                  <ArrowForwardIosIcon
                    style={{
                      fontSize: 12,
                      color: "green",
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
                    color: "green",
                    borderColor: "green",
                  }}
                >
                  Register
                </div>
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterSecond.propTypes = {
  auth: PropTypes.object.isRequired,
  snackbar: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  snackbar: state.snackbar,
});

const mapStateToActions = {};

export default connect(mapStateToProps, mapStateToActions)(RegisterSecond);
