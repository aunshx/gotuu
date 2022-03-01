import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import LoadingButton from "@mui/lab/LoadingButton";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

import logo from "../../../resources/images/gotuuLogo.png";

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

const RegisterFirst = ({
  onSubmit,
  onChange,
  handleClickShowPassword,
  showChange,
  showChangePassword,
  passwordEmptyError,
  emailEmptyError,
  nameEmptyError,
  showPassword,
  name,
  email,
  password,
  increaseStep,
  //   Redux States
  snackbar: { errorSnackbar },
  auth: { loginLoading },
  settings: { displayMode }
}) => {
  const iconButtonStyle = loginIconButtonStyle();

  return (
    <div>
      <div className='card'>
        <img src={logo} alt='John' />
        <div className='title ft-bold'>Register</div>
        <div className='app'>
          {passwordEmptyError && (
            <div className='errors'>Password cannot be empty</div>
          )}
          {emailEmptyError && (
            <div className='errors'>Email cannot be empty</div>
          )}
          {nameEmptyError && <div className='errors'>Name cannot be empty</div>}
          {!nameEmptyError && !passwordEmptyError && !emailEmptyError && (
            <div className='errors-hidden'>.</div>
          )}
        </div>
        <div style={{ paddingBottom: "1em" }}>
          <div style={{ marginBottom: "1.3em" }}>
            {!displayMode ? (
              <CssTextFieldDark
                error={nameEmptyError}
                label='Full Name'
                placeholder='Full Name'
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
                name='name'
                value={name}
                onChange={onChange}
                required
              />
            ) : (
              <CssTextField
                error={nameEmptyError}
                label='Full Name'
                placeholder='Full Name'
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
                name='name'
                value={name}
                onChange={onChange}
                required
              />
            )}
          </div>
          <div style={{ marginBottom: "1.3em" }}>
            {!displayMode ? (
              <CssTextFieldDark
                error={emailEmptyError}
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
                required
              />
            ) : (
              <CssTextField
                error={emailEmptyError}
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
                required
              />
            )}
          </div>
          <div style={{ marginBottom: "1.5em" }}>
            {!displayMode ? (
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
            ) : (
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
            )}
          </div>
          <div>
            <LoadingButton
              size='small'
              //   loading={loginLoading}
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
              onClick={increaseStep}
              className={iconButtonStyle.root}
            >
              <div
                style={{
                  margin: "0em 0.5em 0em 0em",
                  color: "green",
                  borderColor: "green",
                }}
              >
                Next
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
                <span className='link cursor_pointer ft-bold'>Log in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RegisterFirst.propTypes = {
  auth: PropTypes.object.isRequired,
  snackbar: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  snackbar: state.snackbar,
  settings: state.settings,
});

const mapStateToActions = {
};

export default connect(mapStateToProps, mapStateToActions)(RegisterFirst);