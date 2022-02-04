import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBellSlash
} from "@fortawesome/free-solid-svg-icons";

const NavRem = ({}) => {

    const [rem, setRem] = useState(false)

    const reminderOn = () => {
        setRem(true)
    }

    const reminderOff = () => {
        setRem(false)
    }
  return (
    <div className='app popup_nav'>
      {rem ? (
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
      <div className='mrg-r-point-5 ft-bold link' style={{ marginBottom: '0.4em', fontSize: '1em' }} >Reminder Times</div>
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

NavRem.propTypes = {};

export default NavRem;
