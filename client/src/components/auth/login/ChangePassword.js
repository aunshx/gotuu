import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changePassword, login } from "../../../redux/actions/auth";

import LoadingButton from "@mui/lab/LoadingButton";
import {IconButton, InputAdornment, TextField, Button, CircularProgress} from "@mui/material"
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginIcon from "@mui/icons-material/Login";


import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CheckIcon from "@mui/icons-material/Check";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import logo from "../../../resources/images/gotuuLogo.png";
import loginBack from "../../../resources/images/bigLogo.png";
import logoDark from "../../../resources/images/gotuuLogoLogin.png";
import Alerts from "../../layout/Alerts";
import Navbar from "../../navbar/Navbar";

import {
  changePasswordUser,
  resetChangePassword,
} from "../../../redux/actions/auth.js";

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

const ChangePassword = ({
  goChangePass3ToChangePass2,
  goChangePass3ToLogin,
  setCount,
  // Redux Actions
  resetChangePassword,
  changePasswordUser,
  //   Redux States
  auth: { emailChangePassword, changePasswordLoading, changePasswordSuccess },
  settings: { displayMode },
}) => {
  useEffect(() => {
    if (changePasswordSuccess) {
      setTimeout(() => {
        setCount(0);
        resetChangePassword();
      }, 4000);
    }
  }, [changePasswordSuccess]);
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
      changePasswordUser(password, emailChangePassword);
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
              {changePasswordSuccess ? (
                <Button
                  size='small'
                  disabled={changePasswordSuccess}
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
                    Changed
                  </div>
                </Button>
              ) : (
                <LoadingButton
                  size='small'
                  loading={changePasswordLoading}
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
                      fontSize: "11px",
                    }}
                  >
                    Change
                  </div>
                </LoadingButton>
              )}
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
                  onClick={goChangePass3ToChangePass2}
                  className={iconButtonStyle.root}
                >
                  <div
                    style={{
                      margin: "0em 0.5em 0em 0em",
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
                disabled={!changePasswordSuccess}
                endIcon={
                  <LoginIcon
                    style={{
                      fontSize: 12,
                    }}
                  />
                }
                variant='outlined'
                onClick={goChangePass3ToLogin}
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

ChangePassword.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  changePasswordUser: PropTypes.func.isRequired,
  resetChangePassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
});

const mapStateToActions = {
  changePasswordUser,
  resetChangePassword,
};

export default connect(mapStateToProps, mapStateToActions)(ChangePassword);
