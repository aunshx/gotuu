import react, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
     toggleLightMode,
    toggleDarkMode
} from '../../redux/actions/settings'
import useSound from "use-sound";

import toggle from '../../resources/sounds/toggle.mp3'

const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const DarkMode = ({
    // Redux State
    settings: { displayMode },
    // Redux Actions
    toggleLightMode,
    toggleDarkMode
}) => {
    const [playOn] = useSound(toggle, { volume: 1 });

    const toggleTheme = (e) => {
        if (displayMode) {
        setDark();
        toggleDarkMode()
        playOn()
        } else {
        setLight();
        toggleLightMode()
        playOn();
        }
};
  return (
    <div className='display_mode'>
      {displayMode ? (
        <div className='icons cursor_pointer' onClick={toggleTheme}>
          ☀️
        </div>
      ) : (
        <div className='icons  cursor_pointer' onClick={toggleTheme}>
          🌒
        </div>
      )}
    </div>
  );
};

DarkMode.propTypes = {
settings: PropTypes.object.isRequired,
  toggleLightMode: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    settings: state.settings
});

const mapStateToActions = {
  toggleLightMode,
  toggleDarkMode,
};

export default connect(mapStateToProps, mapStateToActions)(DarkMode);

