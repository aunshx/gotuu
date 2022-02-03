import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import {connect} from 'react-redux'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp, faThermometerEmpty } from "@fortawesome/free-solid-svg-icons";

import TimelineIcon from "@mui/icons-material/Timeline"; 
import CloseIcon from "@mui/icons-material/Close"; 
import Element from './Element';
import DatePicker from './DatePicker';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

import NothingToShow from '../NothingToShow'

import windowSize from '../../../utils/windowSize'

import { getTimelineEvent, getTimelineEventAsc, getTimelineDatesCaptured } from '../../../redux/actions/timeline'
import { useCallback } from 'react';
import { useRef } from 'react';

// sksksk

const Timeline = ({
  fixedContent,
  goToMain,
  // Redux States
  timeline: { timeline },
  // Redux Actions
  getTimelineEvent,
  getTimelineEventAsc,
  getTimelineDatesCaptured,
}) => {
  const { width, height } = windowSize();
  const [dateSelected, setDateSelected] = useState();
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);
  const [isTilted, setIsTilted] = useState(false);

  useEffect(() => {
    if (isDatePickerOpened) {
      getTimelineEvent(moment(dateSelected).toISOString());
      getTimelineDatesCaptured()
    }
  }, [dateSelected]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsDatePickerOpened(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsDatePickerOpened(false);
  };

  const handleTilt = (tilt, date) => {
    if(tilt){
      setIsTilted(false)
      getTimelineEvent(date)
    } else {
      setIsTilted(true)
      getTimelineEventAsc(date)
    }
  }

  return (
    <>
      <div className='timeline' id='timeline'>
        <div className='main'>
          <div className='title triple_grid'>
            <Tooltip
              title={
                isTilted ? "Oldest Tuus Displayed" : "Latest Tuus Displayed"
              }
            >
              <div className='timeline-icon'>
                <TimelineIcon
                  className={
                    isTilted
                      ? "timeline-icon--tilted mrg-r-point-5 cursor_pointer"
                      : "timeline-icon mrg-r-point-5 cursor_pointer"
                  }
                  style={{ fontSize: 30 }}
                  onClick={() => handleTilt(isTilted, dateSelected)}
                />
              </div>
            </Tooltip>
            <div>TUULINE</div>
            <div className='date cursor_pointer' onClick={handleClick}>
              {dateSelected ? (
                <>
                  {moment(dateSelected).format("DD/MM/YYYY") ===
                  moment(new Date()).format("DD/MM/YYYY")
                    ? "Today"
                    : moment(dateSelected).format("DD/MM/YYYY")}
                </>
              ) : (
                <>Today</>
              )}
            </div>
            <Menu
              id='fade-menu'
              anchorEl={anchorEl}
              open={open}
              // onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  width: "250px",
                  height: "350px",
                  filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.32))",
                  mt: 1.5,
                },
              }}
              transformOrigin={{
                horizontal: "center",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "center",
                vertical: "bottom",
              }}
            >
              <div className='triple_grid'>
                <div></div>
                <div className='flex_middle ft-bold'>Select Date</div>
                <div className='flex_middle cursor_pointer'>
                  <CloseIcon
                    onClick={handleClose}
                    className='close_date'
                    style={{ fontSize: 20 }}
                  />
                </div>
              </div>
              <DatePicker
                setDateSelected={setDateSelected}
                dateSelected={dateSelected}
              />
            </Menu>
          </div>

          <div className='line'>
            {timeline.length > 0 ? (
              timeline.map((event, index) => (
                <div key={index}>
                  <div className='' data-aos={width < 360 ? "" : "fade-in"}>
                    <Element event={event} type={index} />
                  </div>
                </div>
              ))
            ) : (
              <>
                <NothingToShow
                  primaryMessage={"Timeline is empty"}
                  secondaryMessage={
                    "Try starting and completing a new Tuu! Or click on 'today' to check previous Tuus!"
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
      {fixedContent && (
        <div id='go-up' className='cursor_pointer' data-aos='fade-up-left'>
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            style={{ fontSize: 30, color: "#7ed957" }}
            onClick={goToMain}
          />
        </div>
      )}
    </>
  );
};;

Timeline.propTypes = {
  timeline: PropTypes.object.isRequired,
  getTimelineEvent: PropTypes.func.isRequired,
  getTimelineEventAsc: PropTypes.func.isRequired,
  getTimelineDatesCaptured: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  timeline: state.timeline
})

const mapActionsToProps = {
  getTimelineEvent,
  getTimelineDatesCaptured,
  getTimelineEventAsc
};

export default connect(mapStateToProps, mapActionsToProps)(Timeline);
