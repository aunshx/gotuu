import React from 'react'
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";

import DarkMode from '../../darkmode/DarkMode';

const MaxGif = ({ close, image, altImg, title, 
    // Redux State
    settings: { displayMode }
}) => {
  return (
    <div
      className={
        displayMode ? "max-gif-card" : "max-gif-card max-gif-card--dark"
      }
    >
      <div className='triple_grid'>
        <div></div>
        <div className='title flex_middle'>{title}</div>
        <div className='flex_right icons'>
          <div className='flex_middle'>
            <div>
                <DarkMode />
            </div>
            <div style={{ marginTop: '0.2em' }}>
              <CloseIcon
                onClick={close}
                className='cancel cursor_pointer'
                style={{ fontSize: 20 }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className='flex_middle'>
        <img src={image} alt={altImg} />
      </div>
    </div>
  );
}

MaxGif.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapStateToActions = {};

export default connect(mapStateToProps, mapStateToActions)(MaxGif);