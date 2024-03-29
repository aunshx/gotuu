import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../../redux/actions/auth";

import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { Button, CircularProgress, TextField } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import CheckIcon from "@mui/icons-material/Check";

import logo from "../../../resources/images/gotuuLogo.png";
import loginBack from "../../../resources/images/bigLogo.png";
import logoDark from "../../../resources/images/gotuuLogoLogin.png";
import Alerts from "../../layout/Alerts";
import Navbar from "../../navbar/Navbar";

import { verifyEmail } from "../../../redux/actions/auth";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: "#44af16",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
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

const loginIconButtonStyle = makeStyles({
  root: {
    color: "#158ed4",
    border: "1px solid #158ed4",
    height: 28,
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#0dba4d",
      border: "1px solid #0dba4d",
    },
  },
});

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
};

const CheckEmail = ({
  goChangePassToLogin,
  goChangePassToChangePass2,
  // Redux Actions
  verifyEmail,
  //   Redux States
  auth: { emailVerificationLoading, emailVerified, errorSnackbar },
  settings: { displayMode },
}) => {
  const iconButtonStyle = loginIconButtonStyle();

  const [formData, setFormData] = useState({
    email: "",
  });

  const [emailEmptyError, setEmailEmptyError] = useState(false);

  const { email } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const submitEmailId = () => {
    if (email.length === 0) {
      setEmailEmptyError(true);
      setTimeout(() => setEmailEmptyError(false), 5000);
    } else {
      verifyEmail(email);
    }
  };

  return (
    <>
      <div className='login flex_middle'>
        <div className='login-back'></div>
        <div className='card '>
          <div>
            <img src={displayMode ? logo : logoDark} alt='John' />
            <div className='title ft-bold' style={{ margin: "3px" }}>
              Verify Email
            </div>
            <div className='app'>
              {emailEmptyError && (
                <div className='errors-security'>Email cannot be empty</div>
              )}
            </div>
          </div>
          <div style={{ paddingBottom: "1em" }}>
            <div className='forgot_password_title'>
              Enter your registered email ID to start the password change
              process.
            </div>
            {!displayMode ? (
              <>
                <div style={{ marginBottom: "1.3em" }}>
                  <CssTextFieldDark
                    error={errorSnackbar || emailEmptyError}
                    label='Email ID'
                    placeholder='Email ID'
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
                    name='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: "1.3em" }}>
                  <CssTextField
                    error={errorSnackbar || emailEmptyError}
                    label='Email ID'
                    placeholder='Email ID'
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
                    name='email'
                    value={email}
                    onChange={onChange}
                  />
                </div>
              </>
            )}
            <div style={{ marginBottom: "1.5em" }}>
              {emailVerified ? (
                <Button
                  size='small'
                  disabled={emailVerified}
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
                    Sent
                  </div>
                </Button>
              ) : (
                <LoadingButton
                  size='small'
                  loading={emailVerificationLoading}
                  loadingPosition='end'
                  endIcon={
                    <DoubleArrowIcon
                      style={{
                        fontSize: 12,
                      }}
                    />
                  }
                  variant='outlined'
                  onClick={submitEmailId}
                  className={iconButtonStyle.root}
                >
                  <div
                    style={{
                      margin: "0em 0.5em 0em 0em",
                      borderColor: "green",
                      fontSize: "11px",
                    }}
                  >
                    Send
                  </div>
                </LoadingButton>
              )}
            </div>
          </div>
          <div
            className='flex_evenly'
            style={{ marginTop: "2em", marginBottom: "2em" }}
          >
            <div>
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
                  onClick={goChangePassToLogin}
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
            </div>
            <div>
              <Button
                size='small'
                disabled={!emailVerified}
                endIcon={
                  <ArrowForwardIosIcon
                    style={{
                      fontSize: 12,
                    }}
                  />
                }
                variant='outlined'
                onClick={goChangePassToChangePass2}
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
      <div>
        <Alerts />
      </div>
    </>
  );
};

CheckEmail.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  verifyEmail: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

const mapStateToActions = {
  verifyEmail,
};

export default connect(mapStateToProps, mapStateToActions)(CheckEmail);
