import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell
} from "@fortawesome/free-solid-svg-icons";

import Notif from '../sound/Notif'

const Reminder = ({
}) => {

  return (
    <div className='popup' data-aos-anchor='#example-anchor'>
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
      <Notif />
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