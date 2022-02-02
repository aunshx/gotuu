import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import { connect } from "react-redux";

import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";

import { getNote } from '../../../redux/actions/notes';
import TimelineNote from '../notes/TimelineNote';

const Element = ({
  event,
  type,
  // Redux Actions
  getNote,
}) => {
  const [classy, setClassy] = useState("");
  const [showInHours, setShowInHours] = useState(false);
  const [noteDetails, setNoteDetails] = useState({});
  const [showNote, setShowNote] = useState(false)


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

  return (
    <>
      {type % 2 === 0 ? (
        <div className='left-note'>
          <div className='app'>
            <div className={`element_${classy} flex_middle cursor_pointer`}>
              <Tooltip
                title={showInHours ? "Minutes" : "Hours"}
                placement='top'
              >
                <div onClick={() => setShowInHours(!showInHours)}>
                  {showInHours
                    ? (event.duration / 60000).toFixed("2")
                    : (event.duration / 3600000).toFixed("2")}
                </div>
              </Tooltip>
              {noteDetails && (
                <>
                  <div
                    className={`liner_horizontal_right cursor_pointer`}
                  ></div>
                  <div className=''>
                    {showNote ? (
                      <ArrowCircleDownOutlinedIcon
                        className='liner_horizontal_right_icon_1'
                        style={{ fontSize: 18, cursor: "pointer" }}
                        onClick={closeNote}
                      />
                    ) : (
                      <ArrowCircleUpOutlinedIcon
                        className='liner_horizontal_right_icon_1'
                        style={{ fontSize: 18, cursor: "pointer" }}
                        onClick={openNote}
                      />
                    )}
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
            <div className={`element_${classy} flex_middle cursor_pointer`}>
              <Tooltip
                title={showInHours ? "Minutes" : "Hours"}
                placement='top'
              >
                <div onClick={() => setShowInHours(!showInHours)}>
                  {showInHours
                    ? (event.duration / 60000).toFixed("2")
                    : (event.duration / 3600000).toFixed("2")}
                </div>
              </Tooltip>
              {noteDetails && (
                <>
                  <div className={`liner_horizontal_left`}></div>
                  <div className='cursor_pointer'>
                    {showNote ? (
                      <ArrowCircleDownOutlinedIcon
                        className='liner_horizontal_left_icon_1'
                        style={{ fontSize: 18, cursor: "pointer" }}
                        onClick={closeNote}
                      />
                    ) : (
                      <ArrowCircleUpOutlinedIcon
                        className='liner_horizontal_left_icon_1'
                        style={{ fontSize: 18, cursor: "pointer" }}
                        onClick={openNote}
                      />
                    )}
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
