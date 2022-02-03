import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useSound from "use-sound";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell
} from "@fortawesome/free-solid-svg-icons";
import { Button } from '@mui/material';

import reminderSound from  "../../resources/sounds/reminderBell.mp3";


const Reminder = () => {
  const [play, { stop }] = useSound(reminderSound, { volume: 1 });

       useEffect(() => {
         play();
         setTimeout(() => stop(), 3000);
       }, []);

 
  return (
    <div className='popup'  data-aos-anchor='#example-anchor'>
      <div className='dual_grid'>
        <div className='icon'>
          <FontAwesomeIcon
            icon={faBell}
            style={{ color: "orange", fontSize: 25, marginTop: "0.2em" }}
          />
        </div>
        <div className='popup-details flex_middle ft-bold'>
          30 mins done! Rock on!
        </div>
      </div>
    </div>
  );
};

Reminder.propTypes = {};

export default Reminder;
