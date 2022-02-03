import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useSound from "use-sound";
import { connect } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell
} from "@fortawesome/free-solid-svg-icons";

import reminderSound from  "../../resources/sounds/reminderBell.mp3";


const Reminder = ({
  // Redux State
  settings: { sound },
}) => {
  const [play, { stop }] = useSound(reminderSound, { volume: 1 });

  useEffect(() => {
    if(sound){
      play();
      setTimeout(() => stop(), 3000);
    }
  }, []);

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