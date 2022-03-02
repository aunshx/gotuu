import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Collapse, IconButton } from "@mui/material";
import { connect } from "react-redux";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight'

import { styled } from "@mui/material/styles";

import { getNote } from '../../../redux/actions/notes';
import TimelineNote from '../notes/TimelineNote';

import windowSize from '../../../utils/windowSize';

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

const Element = ({
  event,
  type,
  // Redux Actions
  getNote,
}) => {
  const {  width, height} = windowSize()
  const [classy, setClassy] = useState("");
  const [showInHours, setShowInHours] = useState(false);
  const [noteDetails, setNoteDetails] = useState({});
  const [showNote, setShowNote] = useState(false)
const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let ans = getNote(event._id)
    ans.then((data) => {
      setNoteDetails(data)
    })

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
    setShowNote(true)
  };

  const closeNote = () => {
    setShowNote(false)
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const noteManipulate = () => {
    setShowNote(!showNote)
  }

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
            >
              <div></div>
              <Tooltip
                title={showInHours ? "Minutes" : "Hours"}
                placement='top'
              >
                <div
                  onClick={() => setShowInHours(!showInHours)}
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
                  <div className='title-liner flex_middle'>
                    {noteDetails.title !== undefined
                      ? noteDetails.title.substr(
                          0,
                          noteDetails.title.indexOf(" ")
                        ) + "..."
                      : ""}
                  </div>
                  <div className='' onClick={handleExpandClick}>
                    <ExpandMore
                      expand={expanded}
                      aria-expanded={expanded}
                      aria-label='show more'
                    >
                      <ExpandMoreIcon
                        style={{
                          fontSize: 28,
                        }}
                        onClick={handleExpandClick}
                      />
                    </ExpandMore>
                  </div>
                  <div className=''>
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
                          close={handleExpandClick}
                        />
                      </div>
                    </Collapse>
                  </div>
                </>
              )}
              {noteDetails && (
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
              {showNote && (
                <div className='liner_horizontal_right_icon_note'>
                  <TimelineNote noteDetails={noteDetails} close={closeNote} />
                </div>
              )}
            </div>
            <div className={`liner_vertical cursor_pointer`}></div>
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
            >
              <div></div>
              <Tooltip
                title={showInHours ? "Minutes" : "Hours"}
                placement='top'
              >
                <div
                  onClick={() => setShowInHours(!showInHours)}
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
                  <div className='title-liner flex_middle'>
                    {noteDetails.title !== undefined
                      ? noteDetails.title.substr(
                          0,
                          noteDetails.title.indexOf(" ")
                        ) + "..."
                      : ""}
                  </div>
                  <div className='' onClick={handleExpandClick}>
                    <ExpandMore
                      expand={expanded}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label='show more'
                    >
                      <ExpandMoreIcon
                        style={{
                          fontSize: 28,
                        }}
                        onClick={handleExpandClick}
                      />
                    </ExpandMore>
                  </div>
                  <div className=''>
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
                          close={handleExpandClick}
                        />
                      </div>
                    </Collapse>
                  </div>
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
                  <TimelineNote noteDetails={noteDetails} close={closeNote} />
                </div>
              )}
            </div>
            <div className={`liner_vertical cursor_pointer`}></div>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
};

Element.propTypes = {
  getNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapActionsToProps = {
  getNote
};

export default connect(mapStateToProps, mapActionsToProps)(Element);
