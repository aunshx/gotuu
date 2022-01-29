import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";

import TimelineIcon from "@mui/icons-material/Timeline"; 
import CloseIcon from "@mui/icons-material/Close"; 
import Element from './Element';
import DatePicker from './DatePicker';
import { Menu, MenuItem } from '@mui/material';

// sksksk

const Timeline = ({ goToMain }) => {
  const [dateSelected, setDateSelected] = useState();
  const [isDatePickerOpened, setIsDatePickerOpened] = useState(false)

  useEffect(() => {
    if (isDatePickerOpened) {
      console.log(moment(dateSelected).toISOString(), "- Has changed");
    }
  }, [dateSelected])

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsDatePickerOpened(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsDatePickerOpened(false)
  };

  return (
    <>
      <div className='timeline app'>
        9{" "}
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
                <>{moment(dateSelected).format("DD/MM/YYYY")}</>
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
          {/* <div>
            <DatePicker />
          </div> */}
          <div className='line'>
            <div className='flex_left'>
              <Element duration={300000} />
            </div>
            <div className='flex_middle'>
              <div className={`liner_mini_left cursor_pointer`}></div>
            </div>
            <div className='flex_right'>
              <Element duration={900000} />
            </div>
            <div className='flex_middle'>
              <div className={`liner_tiny_right cursor_pointer`}></div>
            </div>
            <div className='flex_left'>
              <Element duration={1800000} />
            </div>
            <div className='flex_middle'>
              <div className={`liner_extra-small_left cursor_pointer`}></div>
            </div>
            <div className='flex_right'>
              <Element duration={3600000} />
            </div>
            <div className='flex_middle'>
              <div className={`liner_small_right cursor_pointer`}></div>
            </div>
            <div className='flex_left'>
              <Element duration={7200000} />
            </div>
            <div className='flex_middle'>
              <div className={`liner_medium_left cursor_pointer`}></div>
            </div>
            <div className='flex_right'>
              <Element duration={14400000} />
            </div>
            <div className='flex_middle'>
              <div className={`liner_large_right cursor_pointer`}></div>
            </div>
            <div className='flex_left'>
              <Element duration={14405000} />
            </div>
            <div className='flex_middle'>
              <div className={`liner_humongous_left cursor_pointer`}></div>
            </div>
          </div>
        </div>
        <div id='go-up' className='cursor_pointer'>
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

Timeline.propTypes = {};

export default Timeline;
