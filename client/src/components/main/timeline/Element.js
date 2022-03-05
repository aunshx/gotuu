import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Collapse, IconButton, Modal, Fade, Box } from "@mui/material";
import { connect } from "react-redux";
import { useLongPress, LongPressDetectEvents } from "use-long-press";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import store from '../../../store'

import {
  ADD_NEW_NOTE,
  ADD_NOTE_TITLE,
  ADD_NOTE_BODY,
  NOTE_INCOMPLETE,
} from '../../../redux/actions/types'

import { styled } from "@mui/material/styles";

import { getNote } from '../../../redux/actions/notes';
import TimelineNote from '../notes/TimelineNote';

import windowSize from '../../../utils/windowSize';
import Actions from './Actions';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  width: "1em",
  height: "1em",
  color: "white",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  border: "none",
  p: 4,
};

const Element = ({
  event,
  type,
  setReload,
  // Redux Actions
  getNote,
  // Redux State
  notes: { noteId, noteTitle, noteBody },
}) => {
  const { width } = windowSize();
  const [classy, setClassy] = useState("");
  const [showInHours, setShowInHours] = useState(false);
  const [noteDetails, setNoteDetails] = useState({});
  const [showNote, setShowNote] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [completion, setCompletion] = useState(false);

  const callback = useCallback(() => {
    openActions();
  }, []);

  const bind = useLongPress(noteDetails ? null : callback, {
    onCancel: () => setShowInHours(!showInHours),
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH,
  });

  useEffect(() => {
    let ans = getNote(event._id);
    ans.then((data) => {
      setNoteDetails(data);
       if (data.completed) {
         setCompletion(true);
       }
    });

    if (event.duration) {
      switch (true) {
        case event.duration <= 300000:
          return setClassy("mini");
        case 300000 < event.duration && event.duration <= 900000:
          return setClassy("tiny");
        case 900000 < event.duration && event.duration <= 1800000:
          return setClassy("extra-small");
        case 1800000 < event.duration && event.duration <= 3600000:
          return setClassy("small");
        case 3600000 < event.duration && event.duration <= 7200000:
          return setClassy("medium");
        case 7200000 < event.duration && event.duration <= 14400000:
          return setClassy("large");
        case 14400000 < event.duration:
          return setClassy("humongous");
        default:
          return null;
      }
    }
   
  }, [classy, event]);

  const openNote = () => {
    setShowNote(true);
  };

  const closeNote = () => {

      setShowNote(false);
  };

  const openActions = () => {
    setIsActionsOpen(true);
  };

  const closeActions = () => {
    setIsActionsOpen(false);
    setReload(false);
    store.dispatch({
      type: ADD_NEW_NOTE,
      payload: "",
    });
    store.dispatch({
      type: ADD_NOTE_TITLE,
      payload: "",
    });
    store.dispatch({
      type: ADD_NOTE_BODY,
      payload: "",
    });
    store.dispatch({
      type: NOTE_INCOMPLETE
    })
  };

  const showInHoursAction = () => {
    if (noteDetails) {
      setShowInHours(!showInHours);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClickOn = () => {
    setExpanded(true);
  };
  const handleExpandClickOff = () => {
    setExpanded(false);
  };

  const noteManipulate = () => {
    setShowNote(!showNote);
  };

  return (
    <>
      {type % 2 === 0 ? (
        <div className='left-note'>
          <div className='app'>
            <div
              className={
                noteDetails
                  ? `element_${classy} triple_grid cursor_pointer element_padding_${classy}`
                  : `element_${classy} triple_grid cursor_pointer`
              }
              style={noteDetails ? {} : { paddingTop: "0" }}
              {...bind}
            >
              <div></div>
              <Tooltip
                title={showInHours ? "Minutes" : "Hours"}
                placement='top'
              >
                <div
                  className={
                    noteDetails ? "flex_middle" : `flex_middle time_${classy}`
                  }
                  onClick={showInHoursAction}
                >
                  {showInHours ? (
                    <>
                      {(event.duration / 60000).toFixed("2")}
                      <span style={{ marginLeft: "0.2em" }}>m</span>
                    </>
                  ) : (
                    <>
                      {(event.duration / 3600000).toFixed("2")}{" "}
                      <span style={{ marginLeft: "0.2em" }}>h</span>
                    </>
                  )}
                </div>
              </Tooltip>
              {width < 480 && noteDetails && (
                <>
                  <div
                    className='title-liner flex_middle'
                    style={expanded ? { display: "none" } : {}}
                  >
                    {noteDetails.title !== undefined
                      ? noteDetails.title.substr(
                          0,
                          noteDetails.title.indexOf(" ")
                        ) + "..."
                      : ""}
                  </div>
                  <ExpandMore
                    expand={expanded}
                    aria-expanded={expanded}
                    aria-label='show more'
                    style={expanded ? { display: "none" } : {}}
                  >
                    <ExpandMoreIcon
                      style={{
                        fontSize: 28,
                      }}
                      onClick={handleExpandClick}
                    />
                  </ExpandMore>
                  <Collapse
                    in={expanded}
                    timeout='auto'
                    unmountOnExit
                    style={{
                      padding: 0,
                    }}
                  >
                    <TimelineNote
                      noteDetails={noteDetails}
                      close={handleExpandClickOff}
                      eventId={event._id}
                      setReload={setReload}
                      completion={completion}
                      setCompletion={setCompletion}
                    />
                  </Collapse>
                </>
              )}
              {width > 480 && noteDetails && (
                <>
                  <div
                    className={
                      showNote
                        ? `liner_horizontal_right liner_horizontal_right-elongate cursor_pointer`
                        : `liner_horizontal_right cursor_pointer`
                    }
                    onClick={noteManipulate}
                  >
                    <div className='flex_between'>
                      <div></div>
                      {showNote ? (
                        <div className='title-liner flex_middle'>
                          {noteDetails.title}
                        </div>
                      ) : (
                        <div className='title-liner flex_middle'>
                          {noteDetails.title !== undefined
                            ? noteDetails.title.substr(
                                0,
                                noteDetails.title.indexOf(" ")
                              ) + "..."
                            : ""}
                        </div>
                      )}
                      <div className='icons'>
                        {showNote ? (
                          <div
                            onClick={closeNote}
                            style={{ marginTop: "0.5em" }}
                          >
                            <KeyboardDoubleArrowLeftIcon
                              style={{ fontSize: 15 }}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={openNote}
                            style={{ marginTop: "0.5em" }}
                          >
                            <KeyboardDoubleArrowRightIcon
                              style={{ fontSize: 15 }}
                              onClick={openNote}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
              {width > 480 && showNote && (
                <div className='liner_horizontal_right_icon_note'>
                  <TimelineNote
                    noteDetails={noteDetails}
                    close={closeNote}
                    eventId={event._id}
                    setReload={setReload}
                    completion={completion}
                    setCompletion={setCompletion}
                  />
                </div>
              )}
            </div>
            <div
              className={
                noteDetails
                  ? completion
                    ? `liner_vertical cursor_pointer`
                    : `liner_vertical-incomplete cursor_pointer`
                  : "liner_vertical cursor_pointer"
              }
            ></div>
          </div>
          <div></div>
        </div>
      ) : (
        <div className='right-note'>
          <div className='app'>
            <div
              className={
                noteDetails
                  ? `element_${classy} triple_grid cursor_pointer element_padding_${classy}`
                  : `element_${classy} triple_grid cursor_pointer`
              }
              style={noteDetails ? {} : { paddingTop: "0" }}
              {...bind}
            >
              <div></div>
              <Tooltip
                title={showInHours ? "Minutes" : "Hours"}
                placement='top'
              >
                <div
                  onClick={showInHoursAction}
                  className={
                    noteDetails ? "flex_middle" : `flex_middle time_${classy}`
                  }
                >
                  {showInHours ? (
                    <>
                      {(event.duration / 60000).toFixed("2")}
                      <span style={{ marginLeft: "0.2em" }}>m</span>
                    </>
                  ) : (
                    <>
                      {(event.duration / 3600000).toFixed("2")}{" "}
                      <span style={{ marginLeft: "0.2em" }}>h</span>
                    </>
                  )}
                </div>
              </Tooltip>
              {width < 480 && noteDetails && (
                <>
                  <div
                    className='title-liner flex_middle'
                    style={expanded ? { display: "none" } : {}}
                  >
                    {noteDetails.title !== undefined
                      ? noteDetails.title.substr(
                          0,
                          noteDetails.title.indexOf(" ")
                        ) + "..."
                      : ""}
                  </div>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClickOn}
                    aria-expanded={expanded}
                    aria-label='show more'
                    style={expanded ? { display: "none" } : {}}
                  >
                    <ExpandMoreIcon
                      style={{
                        fontSize: 28,
                      }}
                      onClick={handleExpandClickOn}
                    />
                  </ExpandMore>
                  <Collapse
                    in={expanded}
                    timeout='auto'
                    unmountOnExit
                    style={{
                      padding: 0,
                    }}
                  >
                    <div>
                      <TimelineNote
                        noteDetails={noteDetails}
                        close={handleExpandClickOff}
                        eventId={event._id}
                        setReload={setReload}
                        completion={completion}
                        setCompletion={setCompletion}
                      />
                    </div>
                  </Collapse>
                </>
              )}
              {noteDetails && (
                <>
                  <div
                    className={
                      showNote
                        ? `liner_horizontal_left liner_horizontal_left-elongate cursor_pointer`
                        : `liner_horizontal_left cursor_pointer`
                    }
                    onClick={noteManipulate}
                  >
                    <div className='flex_between'>
                      <div className='icons'>
                        {showNote ? (
                          <div
                            onClick={closeNote}
                            style={{ marginTop: "0.5em" }}
                          >
                            <KeyboardDoubleArrowRightIcon
                              style={{ fontSize: 15 }}
                            />
                          </div>
                        ) : (
                          <div
                            onClick={openNote}
                            style={{ marginTop: "0.5em" }}
                          >
                            <KeyboardDoubleArrowLeftIcon
                              style={{ fontSize: 15 }}
                              onClick={openNote}
                            />
                          </div>
                        )}
                      </div>
                      {showNote ? (
                        <div className='title-liner flex_middle'>
                          {noteDetails.title}
                        </div>
                      ) : (
                        <div className='title-liner flex_middle'>
                          {noteDetails.title !== undefined
                            ? noteDetails.title.substr(
                                0,
                                noteDetails.title.indexOf(" ")
                              ) + "..."
                            : ""}
                        </div>
                      )}
                      <div></div>
                    </div>
                  </div>
                </>
              )}
              {showNote && (
                <div className='liner_horizontal_left_icon_note'>
                  <TimelineNote
                    noteDetails={noteDetails}
                    close={closeNote}
                    eventId={event._id}
                    setReload={setReload}
                    completion={completion}
                    setCompletion={setCompletion}
                  />
                </div>
              )}
            </div>
            <div
              className={
                noteDetails
                  ? completion
                    ? `liner_vertical cursor_pointer`
                    : `liner_vertical-incomplete cursor_pointer`
                  : "liner_vertical cursor_pointer"
              }
            ></div>
          </div>
          <div></div>
        </div>
      )}
      <Modal
        open={isActionsOpen}
        onClose={closeActions}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
          style: {
            backgroundColor: "rgba(0,0,0,0.8)",
          },
        }}
      >
        <Fade in={isActionsOpen}>
          <Box style={style}>
            <Actions close={closeActions} eventId={event._id} />
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

Element.propTypes = {
  notes: PropTypes.object.isRequired,
  getNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notes: state.notes
});

const mapActionsToProps = {
  getNote
};

export default connect(mapStateToProps, mapActionsToProps)(Element);
