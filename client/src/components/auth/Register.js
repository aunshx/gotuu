import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

import Navbar from "../navbar/Navbar";
import Alerts from "../layout/Alerts";

import logo from "../../resources/images/gotuuLogo.png";
import logoRes from "../../resources/images/registerBackground.png";
import { Link } from 'react-router-dom';

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

const loginIconButtonStyle = makeStyles({
  root: {
    color: "gray",
    border: "1px solid grey",
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

const textFieldStyle = {
  height: "20px",
  width: "230px",
};

const Register = (props) => {
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
      // login(formData);
    }
  };

  // if (isAuthenticated) {
  //   return <Redirect to='/' />;
  // }

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
            <div className='card'>
              <img src={logo} alt='John' />
              <div className='title ft-bold'>Register</div>
              <div className='app'>
                {(passwordEmptyError || emailEmptyError) && (
                  <div className='errors'>
                    Password or email cannot be empty
                  </div>
                )}
              </div>
              <div style={{ paddingBottom: "1em" }}>
                <div style={{ marginBottom: "1.3em" }}>
                  <CssTextField
                    // error={errorSnackbar || emailEmptyError}
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
                        // error={passwordEmptyError || errorSnackbar}
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
                <div>
                  <LoadingButton
                    size='small'
                    // loading={loginLoading}
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
                    // className={loginStyle.root}
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
                    Have an account?{" "}
                    <Link to='/login' style={{ color: "grey" }}>
                      <span className='link cursor_pointer ft-bold'>
                        Log in
                      </span>
                    </Link>
                  </div>
                </div>
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

Register.propTypes = {};

export default Register;
