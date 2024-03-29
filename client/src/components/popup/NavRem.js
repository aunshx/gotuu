import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Checkbox, styled, FormControlLabel, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBellSlash
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

import {
  setReminderOn,
  setReminderOff,
  setReminderFifteenMinOn,
  setReminderFifteenMinOff,
  setReminderThirtyMinOn,
  setReminderThirtyMinOff,
  setReminderOneHourOn,
  setReminderOneHourOff,
  setReminderTwoHourOn,
  setReminderTwoHourOff,
  setReminderThreeHourOn,
  setReminderThreeHourOff,
} from "../../redux/actions/settings";

const FormControlLabelEdited = styled(FormControlLabel, {
  shouldForwardProp: (props) => props !== "focusColor",
})((p) => ({
  "& .MuiSvgIcon-root": { fontSize: 18, color: 'grey' },
  ".Mui-disabled": {
    color: "grey",
  },
}));

const NavRem = ({
  // Redux State
  settings: {
    reminder,
    reminderFifteenMin,
    reminderThirtyMin,
    reminderOneHour,
    reminderTwoHour,
    reminderThreeHour,
  },
  // Redux Actions
  setReminderOn,
  setReminderOff,
  setReminderFifteenMinOn,
  setReminderFifteenMinOff,
  setReminderThirtyMinOn,
  setReminderThirtyMinOff,
  setReminderOneHourOn,
  setReminderOneHourOff,
  setReminderTwoHourOn,
  setReminderTwoHourOff,
  setReminderThreeHourOn,
  setReminderThreeHourOff,

}) => {
  const reminderOn = () => {
    setReminderOn();
  };

  const reminderOff = () => {
    setReminderOff();
  };

  const setReminderFifteenMin = () => {
    if(reminderFifteenMin){
      setReminderFifteenMinOff()
    } else {
      setReminderFifteenMinOn()
    }
  }
  const setReminderThirtyMin = () => {
    if(reminderThirtyMin){
      setReminderThirtyMinOff()
    } else {
      setReminderThirtyMinOn()
    }
  }
  const setReminderOneHour = () => {
    if(reminderOneHour){
      setReminderOneHourOff()
    } else {
      setReminderOneHourOn()
    }
  }
  const setReminderTwoHour = () => {
    if(reminderTwoHour){
      setReminderTwoHourOff()
    } else {
      setReminderTwoHourOn()
    }
  }
  const setReminderThreeHour = () => {
    if(reminderThreeHour){
      setReminderThreeHourOff()
    } else {
      setReminderThreeHourOn()
    }
  }

  return (
    <div className='app popup_nav'>
      {reminder ? (
        <div className='flex_middle mrg-t-b-1'>
          <div className='flex_middle cursor_pointer' onClick={reminderOff}>
            <div>
              <FontAwesomeIcon
                icon={faBell}
                style={{ fontSize: 18 }}
                className='icon'
              />
            </div>
            <div className='mrg-r-point-5 ft-bold link'>On</div>
          </div>
        </div>
      ) : (
        <div className='flex_middle mrg-t-b-1'>
          <div className='flex_middle cursor_pointer' onClick={reminderOn}>
            <div>
              <FontAwesomeIcon
                icon={faBellSlash}
                style={{ fontSize: 18 }}
                className='icon'
              />
            </div>
            <div className='mrg-r-point-5 ft-bold link'>Off</div>
          </div>
        </div>
      )}
      <div
        className='mrg-r-point-5 ft-bold link'
        style={{ marginBottom: "0.4em", fontSize: "1em" }}
      >
        Reminder Times
      </div>
      <div>
        <FormControlLabelEdited
          control={
            <Checkbox
              checked={reminderFifteenMin}
              onChange={setReminderFifteenMin}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label={<Typography style={{ color: "grey" }}>15 mins</Typography>}
          disabled={!reminder}
        />
      </div>
      <div>
        <FormControlLabelEdited
          control={
            <Checkbox
              checked={reminderThirtyMin}
              onChange={setReminderThirtyMin}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label={<Typography style={{ color: "grey" }}>30 mins</Typography>}
          disabled={!reminder}
        />
      </div>
      <div>
        <FormControlLabelEdited
          control={
            <Checkbox
              checked={reminderOneHour}
              onChange={setReminderOneHour}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label={<Typography style={{ color: "grey" }}>1 hour</Typography>}
          disabled={!reminder}
        />
      </div>
      <div>
        <FormControlLabelEdited
          control={
            <Checkbox
              checked={reminderTwoHour}
              onChange={setReminderTwoHour}
              sx={{
                "& .MuiSvgIcon-root": { fontSize: 18 },
              }}
              color='success'
            />
          }
          label={<Typography style={{ color: "grey" }}>2 hours</Typography>}
          disabled={!reminder}
        />
      </div>
      <div>
        <FormControlLabelEdited
          control={
            <Checkbox
              checked={reminderThreeHour}
              onChange={setReminderThreeHour}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label={<Typography style={{ color: "grey" }}>3 hours</Typography>}
          disabled={!reminder}
        />
      </div>
    </div>
  );
};

NavRem.propTypes = {
  settings: PropTypes.object.isRequired,
  setReminderOn: PropTypes.func.isRequired,
  setReminderOff: PropTypes.func.isRequired,
  setReminderFifteenMinOn: PropTypes.func.isRequired,
  setReminderFifteenMinOff: PropTypes.func.isRequired,
  setReminderThirtyMinOn: PropTypes.func.isRequired,
  setReminderThirtyMinOff: PropTypes.func.isRequired,
  setReminderOneHourOn: PropTypes.func.isRequired,
  setReminderOneHourOff: PropTypes.func.isRequired,
  setReminderTwoHourOn: PropTypes.func.isRequired,
  setReminderTwoHourOff: PropTypes.func.isRequired,
  setReminderThreeHourOn: PropTypes.func.isRequired,
  setReminderThreeHourOff: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    settings: state.settings
});

const mapActionsToProps = {
  setReminderOn,
  setReminderOff,
  setReminderFifteenMinOn,
  setReminderFifteenMinOff,
  setReminderThirtyMinOn,
  setReminderThirtyMinOff,
  setReminderOneHourOn,
  setReminderOneHourOff,
  setReminderTwoHourOn,
  setReminderTwoHourOff,
  setReminderThreeHourOn,
  setReminderThreeHourOff,
};

export default connect(mapStateToProps, mapActionsToProps)(NavRem);
