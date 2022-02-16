import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changePassword, login } from "../../redux/actions/auth";

import LoadingButton from "@mui/lab/LoadingButton";
import {IconButton, InputAdornment, TextField, Button, CircularProgress} from "@mui/material"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";


import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import logo from "../../resources/images/gotuuLogo.png";
import loginBack from "../../resources/images/bigLogo.png";
import logoDark from "../../resources/images/gotuuLogoLogin.png";
import Alerts from "../layout/Alerts";
import Navbar from "../navbar/Navbar";

import {
  changePasswordUser,
  resetChangePassword,
  resetSecurityCodePassword,
} from "../../redux/actions/auth.js";

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
  },
}));

const loginIconButtonStyle = makeStyles({
  root: {
    color: "gray",
    border: "1px solid green",
    height: 28,
    backgroundColor: "none",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#1686f0",
      border: "1px solid #1686f0",
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

const ChangePassword2 = ({
  goChangePass2ToChangePass,
  goChangePass2ToLogin,
  setCount,
  // Redux Actions
  resetChangePassword,
  changePasswordUser,
  resetSecurityCodePassword,
  //   Redux States
  auth: { forgotPasswordEmail, forgotPasswordLoading, forgotPasswordChange },
  settings: { displayMode },
}) => {
  useEffect(() => {
    if (forgotPasswordChange) {
      setCount(0);
      setTimeout(() => {
        resetChangePassword();
        resetSecurityCodePassword()
      }, 1000);
    }
  }, [forgotPasswordChange]);
  const iconButtonStyle = loginIconButtonStyle();

  const [formData, setFormData] = useState({
    password: "",
    password2: "",
    showPassword: false,
    showPassword2: false,
  });

  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const [passwordEmptyError2, setPasswordEmptyError2] = useState(false);
  const [passwordEmptyError3, setPasswordEmptyError3] = useState(false);

  const { password, password2, showPassword, showPassword2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleClickShowPassword = () => {
    setFormData({
      ...formData,
      showPassword: !showPassword,
    });
  };

  const handleClickShowPassword2 = () => {
    setFormData({
      ...formData,
      showPassword2: !showPassword2,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // redux action dispatched
    if (password.length === 0) {
      setPasswordEmptyError(true);
      setTimeout(() => setPasswordEmptyError(false), 5000);
    } else if (password2.length === 0) {
      setPasswordEmptyError2(true);
      setTimeout(() => setPasswordEmptyError2(false), 5000);
    } else if (password !== password2) {
      setPasswordEmptyError3(true);
      setTimeout(() => setPasswordEmptyError3(false), 5000);
    } else {
      changePasswordUser(password, forgotPasswordEmail);
    }
  };

  return (
    <>
      <Navbar />
      <div className='login flex_middle'>
        <div className='login-back'>
        </div>
        <div className='card '>
          <div>
            <img src={displayMode ? logo : logoDark} alt='John' />
            <div className='title ft-bold' style={{ margin: "3px" }}>
              Change Password
            </div>
            <div className='app'>
              {passwordEmptyError && (
                <div className='errors' style={{ marginBottom: "0.3em" }}>
                  Password cannot be empty
                </div>
              )}
              {passwordEmptyError3 && (
                <div className='errors' style={{ marginBottom: "0.3em" }}>
                  Passwords do not match!
                </div>
              )}
            </div>
          </div>
          <div style={{ paddingBottom: "1em" }}>
            <div className='forgot_password_title'>Enter new password.</div>
            {!displayMode ? (
              <>
                <div style={{ marginBottom: "1.3em" }}>
                  <CssTextFieldDark
                    error={passwordEmptyError}
                    label='Password'
                    size='small'
                    variant='outlined'
                    type={showPassword ? "text" : "password"}
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    inputProps={{
                      style: {
                        height: "20px",
                        width: "186px",
                        color: "white",
                      },
                    }}
                    name='password'
                    value={password}
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <Visibility
                                style={{
                                  fontSize: 18,
                                  color: "grey",
                                }}
                              />
                            ) : (
                              <VisibilityOff
                                style={{
                                  fontSize: 18,
                                  color: "grey",
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <CssTextFieldDark
                    error={passwordEmptyError2}
                    label='Retype Password'
                    size='small'
                    variant='outlined'
                    type={showPassword2 ? "text" : "password"}
                    InputLabelProps={{
                      style: textFieldInputLabelStyleDark,
                    }}
                    inputProps={{
                      style: {
                        height: "20px",
                        width: "186px",
                        color: "white",
                      },
                    }}
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword2}
                          >
                            {showPassword2 ? (
                              <Visibility
                                style={{
                                  fontSize: 18,
                                  color: "grey",
                                }}
                              />
                            ) : (
                              <VisibilityOff
                                style={{
                                  fontSize: 18,
                                  color: "grey",
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div style={{ marginBottom: "1.3em" }}>
                  <CssTextField
                    error={passwordEmptyError}
                    label='Password'
                    size='small'
                    variant='outlined'
                    type={showPassword ? "text" : "password"}
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    inputProps={{
                      style: {
                        height: "20px",
                        width: "186px",
                      },
                    }}
                    name='password'
                    value={password}
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <Visibility
                                style={{
                                  fontSize: 18,
                                }}
                              />
                            ) : (
                              <VisibilityOff
                                style={{
                                  fontSize: 18,
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <div>
                  <CssTextField
                    error={passwordEmptyError2}
                    label='Retype Password'
                    size='small'
                    variant='outlined'
                    type={showPassword2 ? "text" : "password"}
                    InputLabelProps={{
                      style: textFieldInputLabelStyle,
                    }}
                    inputProps={{
                      style: {
                        height: "20px",
                        width: "186px",
                      },
                    }}
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword2}
                          >
                            {showPassword2 ? (
                              <Visibility
                                style={{
                                  fontSize: 18,
                                }}
                              />
                            ) : (
                              <VisibilityOff
                                style={{
                                  fontSize: 18,
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
              </>
            )}
            <div style={{ marginTop: "1.3em" }}>
              <LoadingButton
                size='small'
                loading={forgotPasswordLoading}
                loadingIndicator={
                  <CircularProgress style={{ color: "gray" }} size={16} />
                }
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
                    color: "green",
                    fontSize: "11px",
                  }}
                >
                  Save
                </div>
              </LoadingButton>
            </div>
          </div>
          <div className='flex_evenly' style={{ margin: "1em 0" }}>
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
                  onClick={goChangePass2ToChangePass}
                  className={iconButtonStyle.root}
                >
                  <div
                    style={{
                      margin: "0em 0.5em 0em 0em",
                      color: "green",
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
                loadingPosition='end'
                disabled={true}
                endIcon={
                  <LoginIcon
                    style={{
                      fontSize: 12,
                    }}
                  />
                }
                variant='outlined'
                onClick={goChangePass2ToLogin}
                className={iconButtonStyle.root}
              >
                <div
                  style={{
                    margin: "0em 0.5em 0em 0em",
                    borderColor: "green",
                    fontSize: "11px",
                  }}
                >
                  Login
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

ChangePassword2.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  changePasswordUser: PropTypes.func.isRequired,
  resetChangePassword: PropTypes.func.isRequired,
  resetSecurityCodePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

const mapStateToActions = {
  changePasswordUser,
  resetChangePassword,
  resetSecurityCodePassword,
};

export default connect(mapStateToProps, mapStateToActions)(ChangePassword2);
