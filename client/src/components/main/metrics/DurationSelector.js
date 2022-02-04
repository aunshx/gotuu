import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { TextField, styled, MenuItem, FormControl } from "@mui/material";
import { makeStyles } from "@mui/styles";
import setAuthToken from "../../../utils/setAuthToken";
import { connect } from "react-redux";

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: "none",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "none",
      fontSize: "0.9em",
    },
  },
  border: "1px solid gray",
  height: "18px",
  width: "100%",
  borderRadius: "10px",
  color: "white",
}));

const CssTextFieldDark = styled(TextField, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  // input label when focused
  "& label.Mui-focused": {
    color: "none",
  },
  // focused color for input with variant='outlined'
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: "none",
      fontSize: "0.9em",
    },
  },
  border: "1px solid white",
  height: "18px",
  width: "100%",
  borderRadius: "10px",
  color: "white",
}));

const useStyles = makeStyles({
  icon: {
    display: 'none'
  },
});

const DurationSelector = ({
  duration,
  onChangeDuration,
  // Redux State
  settings: { displayMode },
}) => {
  const classes = useStyles();

  return (
    <div>
      {!displayMode ? (
        <FormControl>
          <CssTextFieldDark
            select
            placeholder='Difficulty'
            variant='standard'
            name='duration'
            value={duration}
            onChange={onChangeDuration}
            size='small'
            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
            sx={{
              width: 100,
              padding: "0em 0em 0em 1.2em",
            }}
            InputProps={{
              style: {
                border: "none",
                color: "white",
                fontSize: "0.7em",
                padding: "0 0 0.2em 0",
              },
              disableUnderline: true,
            }}
          >
            <MenuItem
              style={{
                fontSize: "0.9em",
                height: "20px",
              }}
              value={"week"}
            >
              vs 7 Days
            </MenuItem>
            <MenuItem
              value={"month"}
              style={{
                fontSize: "0.9em",
                height: "20px",
              }}
            >
              vs Month
            </MenuItem>
            <MenuItem
              value={"year"}
              style={{
                fontSize: "0.9em",
                height: "20px",
              }}
            >
              vs Year
            </MenuItem>
          </CssTextFieldDark>
        </FormControl>
      ) : (
        <FormControl>
          <CssTextField
            select
            placeholder='Difficulty'
            variant='standard'
            name='duration'
            value={duration}
            onChange={onChangeDuration}
            size='small'
            inputProps={{
              classes: {
                icon: classes.icon,
              },
            }}
            sx={{
              width: 100,
              padding: "0em 0em 0em 1.2em",
            }}
            InputProps={{
              style: {
                border: "none",
                color: "gray",
                fontSize: "0.7em",
                padding: "0 0 0.2em 0",
              },
              disableUnderline: true,
            }}
          >
            <MenuItem
              style={{
                fontSize: "0.9em",
                height: "20px",
              }}
              value={"week"}
            >
              vs 7 Days
            </MenuItem>
            <MenuItem
              value={"month"}
              style={{
                fontSize: "0.9em",
                height: "20px",
              }}
            >
              vs Month
            </MenuItem>
            <MenuItem
              value={"year"}
              style={{
                fontSize: "0.9em",
                height: "20px",
              }}
            >
              vs Year
            </MenuItem>
          </CssTextField>
        </FormControl>
      )}
    </div>
  );
};

DurationSelector.propTypes = {
 settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings
});

const mapStateToActions = {

};

export default connect(mapStateToProps, mapStateToActions)(DurationSelector);
