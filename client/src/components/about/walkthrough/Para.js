import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Modal, Box, Fade, Tooltip } from '@mui/material'
import OpenInFullIcon from "@mui/icons-material/OpenInFull";

import Tags from './Tags'
import MaxGif from './MaxGif'

import defaultImage from '../../../resources/images/default.jpg'

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
  title,
  details,
  tags,
  altImg,
  // Redux States
  settings: { displayMode }
}) => {

    const [maximize, setMaximize] = useState(false)

    const enlargeGif = () => {
        setMaximize(true)
    }

    const reduceGif = () => {
        setMaximize(false)
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
          <img
            src={
              displayMode
                ? imageLight || defaultImage
                : imageDark || defaultImage
            }
            alt={altImg}
          />
          <Tooltip title='Enlarge' placement='top'>
            <div className='enlarge flex_middle' onClick={enlargeGif}>
                <OpenInFullIcon style={{ fontSize: 15 }} />
            </div>
          </Tooltip>
        </div>
        <div className='flex_between ft-bold details-para'>
          <div style={{ fontSize: "0.9em", color: "grey" }}>Details</div>
          <div className='flex_between'>
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