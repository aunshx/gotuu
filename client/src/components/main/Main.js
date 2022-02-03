import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import GetTime from '../../utils/GetTime'
import Time from './count/Time'
import Count from './count/Count';
import Go from './Go';
import Timeline from './timeline/Timeline';
import Alerts from '../layout/Alerts'
import Reminder from '../popup/Reminder';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, Modal, Fade, Box, Badge } from '@mui/material';
import Note from './notes/Note';
import { connect } from 'react-redux';

import {
  createNewNote
} from '../../redux/actions/notes'

const style = {
  position: "fixed",
  top: "50%",
  left: "48%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  p: 4,
};

const Main = ({
  goMain,
  isActive,
  setIsActive,
  // Redux State
  auth: { isAuthenticated },
  timeline: { currentEventId },
  notes: { noteId },
  // Redux Actions
  createNewNote,
}) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isCounting, setIsCounting] = useState(false);
  const [start, setStart] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [toggleNote, setToggleNote] = useState(false);
  const reffie = useRef();
  const handle = useRef();

  useEffect(() => (document.title = "Gotuu | Track your time"), []);

  const toggleFullScreen = () => {
    setIsFull(true);
    if (handle.current.requestFullscreen) {
      console.log(handle.current);
      handle.current.requestFullscreen();
    } else if (handle.current.msRequestFullscreen) {
      handle.current.msRequestFullscreen();
    } else if (handle.current.mozRequestFullScreen) {
      handle.current.mozRequestFullScreen();
    } else if (handle.current.webkitRequestFullscreen) {
      handle.current.webkitRequestFullscreen();
    }
  };

  const stopFullScreen = () => {
    setIsFull(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozExitFullScreen) {
      document.mozExitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  useEffect(() => {
    if (start === true) {
      setTimeout(() => setStart(false), 1005);
    }

    return () => clearTimeout();
  });

  const isHoveringTrue = () => {
    setIsHovering(true);
  };

  const isHoveringFalse = () => {
    setIsHovering(false);
  };

  const startCountDown = () => {
    setIsCounting(true);
    setIsActive(true);
  };

  const stopCountDown = () => {
    setIsCounting(false);
    setIsActive(false);
  };

  const scrollSmoothHandler = () => {
    setStart(true);
    setTimeout(
      () => reffie.current.scrollIntoView({ behavior: "smooth" }),
      1005
    );
  };

  const toggleNewNote = (currentEventId, noteId) => {
    setIsNoteOpen(true);
    if(!noteId){
      createNewNote(currentEventId);
    }
  };

  const unToggleNewNote = () => {
    setIsNoteOpen(false);
  };
  return (
    <div
      className={isActive ? "main-active flex_middle" : "main flex_middle"}
      id='main'
      ref={handle}
    >
      <div className='app' style={{ marginBottom: "10vh" }}>
        {isCounting ? (
          <Count
            isCounting={isCounting}
            isHovering={isHovering}
            isHoveringTrue={isHoveringTrue}
            isHoveringFalse={isHoveringFalse}
            stopCountDown={stopCountDown}
            scrollSmoothHandler={scrollSmoothHandler}
          />
        ) : (
          <Go
            isHovering={isHovering}
            isHoveringTrue={isHoveringTrue}
            isHoveringFalse={isHoveringFalse}
            startCountDown={startCountDown}
          />
        )}
        {isCounting && (
          <>
            {isFull ? (
              <Tooltip title='Close' placement='top'>
                <div
                  className='expand-icon cursor_pointer'
                  onClick={stopFullScreen}
                >
                  <FontAwesomeIcon
                    icon={faCompressAlt}
                    style={{ fontSize: 20, color: "gray" }}
                  />
                </div>
              </Tooltip>
            ) : (
              <div className='expand-icon  flex_middle cursor_pointer'>
                <Tooltip title='Expand' placement='top'>
                  <div
                    onClick={toggleFullScreen}
                    className={isAuthenticated ? "icons-left" : ""}
                  >
                    <FontAwesomeIcon
                      icon={faExpandAlt}
                      style={{ fontSize: 20, color: "gray" }}
                    />
                  </div>
                </Tooltip>
                <Tooltip title='Create Note' placement='top'>
                  <div
                    onClick={() => toggleNewNote(currentEventId, noteId)}
                    className={isAuthenticated ? "icons-right" : "invisible"}
                  >
                    {noteId && <div className='notes-active-point'></div>}
                    <FontAwesomeIcon
                      icon={faStickyNote}
                      style={{
                        fontSize: 20,
                        color: "gray",
                      }}
                    />
                  </div>
                </Tooltip>
              </div>
            )}
          </>
        )}
        {start && <div className='go-down' ref={reffie}></div>}
        <div>
          <Alerts />
        </div>
        <div
          className='flex_middle'
          id='#example-anchor'
        >
          <Reminder />
        </div>
      </div>
      <Modal
        open={isNoteOpen}
        onClose={!isNoteOpen}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <Fade in={isNoteOpen}>
          <Box style={style}>
            <Note close={unToggleNewNote} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

Main.propTypes = {
  auth: PropTypes.object.isRequired,
  notes: PropTypes.object.isRequired,
  timeline: PropTypes.object.isRequired,
  createNewNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  timeline: state.timeline,
  notes: state.notes
});

const mapActionsToProps = {
  createNewNote,
};

export default connect(mapStateToProps, mapActionsToProps)(Main);
