import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBellSlash
} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';

import {
    setReminderOn,
  setReminderOff,
} from '../../redux/actions/settings'

const NavRem = ({
    // Redux State
    settings: { reminder },
    // Redux Actions 
    setReminderOn,
    setReminderOff
}) => {

     const reminderOn = () => {
       setReminderOn();
     };

     const reminderOff = () => {
       setReminderOff();
     };

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
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label='15 mins'
          style={{ color: "grey" }}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label='30 mins'
          style={{ color: "grey" }}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label='1 hour'
          style={{ color: "grey" }}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label='2 hours'
          style={{ color: "grey" }}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
              color='success'
            />
          }
          label='3 hours'
          style={{ color: "grey" }}
        />
      </div>
    </div>
  );
};

NavRem.propTypes = {
settings: PropTypes.object.isRequired,
  setReminderOn: PropTypes.func.isRequired,
  setReminderOff: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    settings: state.settings
});

const mapActionsToProps = {
  setReminderOn,
  setReminderOff,
};

export default connect(mapStateToProps, mapActionsToProps)(NavRem);
