import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
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

import logo from "../../resources/images/gotuuLogo.png";
import Alert from "../layout/Alerts";
import Alerts from "../layout/Alerts";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: p.focusColor,
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: p.focusColor,
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
  width: "250px",
};

const Login = ({
  login,
  auth: { isAuthenticated, loginLoading, errorSnackbar },
}) => {
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

  const revertChange = () => {
    setShowChangePassword(false);
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
      <div className='login flex_middle'>
        <div className='card'>
          <img src={logo} alt='John' />
          <div className='title ft-bold'>Login</div>
          <div className='app'>
            {(passwordEmptyError || emailEmptyError) && (
              <div className='errors'>Password or email cannot be empty</div>
            )}
          </div>
          <div style={{ paddingBottom: "1em" }}>
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
                        width: "209px",
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
                className='login_button_submit'
              >
                <div
                  style={{
                    margin: "0em 0.5em 0em 0em",
                  }}
                >
                  Login
                </div>
              </LoadingButton>
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
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
})

const mapStateToActions = {
    login
}

export default connect(mapStateToProps, mapStateToActions)(Login);
