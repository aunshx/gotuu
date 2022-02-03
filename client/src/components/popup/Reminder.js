import React from 'react';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell
} from "@fortawesome/free-solid-svg-icons";

const Reminder = () => {
  return (
    <div className='popup' data-aos='fade-up' data-aos-anchor='#example-anchor'>
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
