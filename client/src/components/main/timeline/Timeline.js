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
import { Menu, MenuItem } from '@mui/material';

import NothingToShow from '../NothingToShow'

import { getTimelineEvent, getTimelineDatesCaptured } from '../../../redux/actions/timeline'

// sksksk

const Timeline = ({
  goToMain,
  // Redux States
  timeline: { timeline },
  // Redux Actions
  getTimelineEvent,
  getTimelineDatesCaptured,
}) => {
  const [dateSelected, setDateSelected] = useState();
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false);

  useEffect(() => {
    const date = new Date();
    if (isDatePickerOpened) {
      getTimelineEvent(moment(dateSelected).toISOString());
      getTimelineDatesCaptured()
    } else {
      getTimelineEvent(moment(date).toISOString());
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

  return (
    <>
      <div className='timeline app' id='timeline'>
        {" "}
        <div className='main'>
          <div className='title flex_evenly'>
            <div>
              <TimelineIcon
                className='mrg-r-point-5'
                style={{ fontSize: 30 }}
              />
            </div>
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
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    left: 120,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
                style: {
                  transform: "translateX(0px) translateY(-1px)",
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
                <div key={index} >
                  <div className=''>
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
        <div
          id='go-up'
          className='cursor_pointer animated bounce'
          data-aos='fade-up-left'
        >
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            style={{ fontSize: 35, color: "#7ed957" }}
            onClick={goToMain}
          />
        </div>
      </div>
    </>
  );
};;

Timeline.propTypes = {
  timeline: PropTypes.object.isRequired,
  getTimelineEvent: PropTypes.func.isRequired,
  getTimelineDatesCaptured: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  timeline: state.timeline
})

const mapActionsToProps = {
  getTimelineEvent,
  getTimelineDatesCaptured,
};

export default connect(mapStateToProps, mapActionsToProps)(Timeline);
