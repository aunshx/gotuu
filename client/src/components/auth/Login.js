import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../redux/actions/auth";

import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";

import logo from "../../resources/images/gotuuLogo.png";
import loginBack from '../../resources/images/bigLogo.png'
import logoDark from '../../resources/images/gotuuLogoLogin.png'
import Alerts from "../layout/Alerts";
import Navbar from "../navbar/Navbar";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: '#44af16',
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: '#44af16',
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
    color: 'white'
  },
}));

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

const textFieldInputLabelStyle = {
  fontSize: "0.9em",
  alignSelf: "center",
  justifySelf: "center",
};

const textFieldInputLabelStyleDark = {
  fontSize: "0.9em",
  alignSelf: "center",
  justifySelf: "center",
  color: 'gray'
};

const textFieldStyle = {
  height: "20px",
  width: "230px",
};


const Login = ({
  goLoginToChangePass,
  // Redux Actions
  login,
  // Redux State
  auth: { isAuthenticated, loginLoading, errorSnackbar },
  settings: { displayMode }
}) => {
  const iconButtonStyle = loginIconButtonStyle();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordEmptyError, setPasswordEmptyError] = useState(false);
  const [emailEmptyError, setEmailEmptyError] = useState(false);

  const { email, password, showPassword } = formData;

  const showChange = () => {
    setShowChangePassword(true);
  };

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
    // redux action dispatched
    if (password.length === 0 || email.length === 0) {
      setPasswordEmptyError(true);
      setEmailEmptyError(true);
      setTimeout(() => setEmailEmptyError(false), 5000);
      setTimeout(() => setPasswordEmptyError(false), 5000);
    } else {
      login(formData);
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <Navbar />
      <div className='login flex_middle'>
        <div className='login-back'>
          {/* <img src={loginBack} alt='login background' /> */}
        </div>
        <div className='card'>
          <img src={displayMode ? logo : logoDark} alt='John' />
          <div className='title ft-bold'>Login</div>
          <div className='app'>
            {(passwordEmptyError || emailEmptyError) && (
              <div className='errors'>Password or email cannot be empty</div>
            )}
          </div>
          <div style={{ paddingBottom: "1em" }}>
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
                <div>
                  <div>
                    <div>
                      <CssTextFieldDark
                        error={passwordEmptyError || errorSnackbar}
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
                    <div
                      style={{
                        margin: "0.2em 9.5em 1.5em 0.2em",
                      }}
                    >
                      <div
                        onClick={goLoginToChangePass}
                        className='forgot_password_login_main'
                      >
                        <i> Forgot Password?</i>
                      </div>
                    </div>
                  </div>
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
                <div>
                  <div>
                    <div>
                      <CssTextField
                        error={passwordEmptyError || errorSnackbar}
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
                    <div
                      style={{
                        margin: "-0.2em 9.5em 1.5em 0.2em",
                      }}
                    >
                      <div
                        onClick={showChange}
                        className='forgot_password_login_main'
                      >
                        <i> Forgot Password?</i>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div>
              <LoadingButton
                size='small'
                loading={loginLoading}
                loadingPosition='end'
                endIcon={
                  <ArrowForwardIosIcon
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
                    borderColor: "green",
                  }}
                >
                  Login
                </div>
              </LoadingButton>
            </div>
            <div className='app'>
              <div
                style={{
                  borderBottom: "1px solid #b5b5b5",
                  width: "90%",
                  padding: "1em 0 0 0",
                }}
              ></div>
              <div className='sign_up_login'>
                Don't have an account?{" "}
                <Link to='/register' style={{ color: "grey" }}>
                  <span className='link cursor_pointer ft-bold'>Sign Up</span>
                </Link>
              </div>
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

Login.propTypes = {
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  settings: state.settings,
})

const mapStateToActions = {
  login,
}

export default connect(mapStateToProps, mapStateToActions)(Login);
