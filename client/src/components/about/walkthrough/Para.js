import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Modal, Box, Fade, Tooltip } from '@mui/material'

import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

import Tags from './Tags'
import MaxGif from './MaxGif'

import defaultImage from '../../../resources/images/default.jpg'
import transfer from '../../../resources/images/bigLogo.png'

import windowSize from '../../../utils/windowSize'

const style = {
  position: "fixed",
  top: "50%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  border: "none",
  p: 4,
};

const Para = ({
  srNo,
  imageLight,
  imageDark,
  imageLightMobile,
  imageDarkMobile,
  title,
  details,
  tags,
  altImg,
  // Redux States
  settings: { displayMode }
}) => {

    const [maximize, setMaximize] = useState(false)
    const { width } = windowSize()

    const [gifSee, setGifSee] = useState(true)

    const enlargeGif = () => {
        setMaximize(true)
    }

    const reduceGif = () => {
        setMaximize(false)
    }

    const reloadGif = () => {
      setGifSee(false)
      setTimeout(() => setGifSee(true), 300);
    }

  return (
    <>
      <div
        className={
          displayMode
            ? "walkthrough-para"
            : "walkthrough-para  walkthrough-para--dark"
        }
      >
        <div className='title-para flex_middle'>
          <span style={{ marginRight: "0.3em" }}>{srNo}.</span> {title}
        </div>
        <div className='image-para flex_middle'>
          {gifSee ? (
            <>
              {width < 650 ? (
                <img
                  src={
                    gifSee
                      ? displayMode
                        ? imageLightMobile || defaultImage
                        : imageDarkMobile || defaultImage
                      : transfer
                  }
                  alt={altImg}
                />
              ) : (
                <img
                  src={
                    gifSee
                      ? displayMode
                        ? imageLight || defaultImage
                        : imageDark || defaultImage
                      : transfer
                  }
                  alt={altImg}
                />
              )}
            </>
          ) : (
            <div class='lds-ripple'>
              <div></div>
              <div></div>
            </div>
          )}

          <div className='enlarge flex_middle'>
            {width > 786 && (
              <Tooltip title='Enlarge' placement='top'>
                <OpenInFullIcon
                  style={{ fontSize: 15 }}
                  onClick={enlargeGif}
                  className='enlarge-one'
                />
              </Tooltip>
            )}
            <Tooltip title='Replay' placement='top'>
              <ReplayOutlinedIcon
                style={{ fontSize: 16, marginLeft: "0.5em" }}
                className='enlarge-two'
                onClick={reloadGif}
              />
            </Tooltip>
          </div>
        </div>
        <div
          className={
            width < 600
              ? "app ft-bold details-para"
              : "flex_between ft-bold details-para"
          }
        >
          <div style={{ fontSize: "0.9em", color: "grey" }}>Details</div>
          <div
            className='flex_between'
            style={width < 600 ? { marginTop: "0.5em" } : {}}
          >
            {tags.length > 0 &&
              tags.map((element, index) => (
                <Tags key={index} title={element} />
              ))}
          </div>
        </div>
        <div className='caption'>
          <ul>
            {details.length > 0 &&
              details.map((element, index) => <li key={index}>{element}</li>)}
          </ul>
        </div>
      </div>
      <Modal
        open={maximize}
        onClose={reduceGif}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <Fade in={maximize}>
          <Box style={style}>
            <MaxGif
              close={reduceGif}
              image={displayMode ? imageLight : imageDark}
              altImg={altImg}
              title={title}
            />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

Para.propTypes = {
  settings: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  settings: state.settings,
});

const mapStateToActions = {
};

export default connect(mapStateToProps, mapStateToActions)(Para);