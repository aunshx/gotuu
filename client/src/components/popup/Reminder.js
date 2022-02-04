import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell
} from "@fortawesome/free-solid-svg-icons";

import Notif from '../sound/Notif'

const Reminder = ({ message, type }) => {

  return (
    <div className='popup' data-aos-anchor='#example-anchor' data-aos='fade-up'>
      <div className='dual_grid'>
        <div className='icon'>
          <FontAwesomeIcon
            icon={faBell}
            style={{ color: "orange", fontSize: 25, marginTop: "0.2em" }}
          />
        </div>
        <div className='popup-details flex_middle ft-bold'>{message}</div>
      </div>
      <Notif type={type} />
    </div>
  );
};

Reminder.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapActionsToProps = {
};

export default connect(mapStateToProps, mapActionsToProps)(Reminder);