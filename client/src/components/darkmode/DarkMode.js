import "./DarkMode.css";
import react from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
     toggleLightMode,
    toggleDarkMode
} from '../../redux/actions/settings'

const setDark = () => {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
  localStorage.setItem("theme", "light");
  document.documentElement.setAttribute("data-theme", "light");
};

const DarkMode = ({
    // Redux Actions
    toggleLightMode,
    toggleDarkMode
}) => {
    const toggleTheme = (e) => {
        if (e.target.checked) {
        setDark();
        toggleDarkMode()
        } else {
        setLight();
        toggleLightMode()
        }
};
  return (
    <div className='toggle-theme-wrapper'>
      <span>☀️</span>
      <label className='toggle-theme' htmlFor='checkbox'>
        <input
          type='checkbox'
          id='checkbox'
          // 6
          onChange={toggleTheme}
          defaultChecked={setLight}
        />
        <div className='slider round'></div>
      </label>
      <span>🌒</span>
    </div>
  );
};

DarkMode.propTypes = {
  toggleLightMode: PropTypes.func.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({});

const mapStateToActions = {
  toggleLightMode,
  toggleDarkMode,
};

export default connect(mapStateToProps, mapStateToActions)(DarkMode);

