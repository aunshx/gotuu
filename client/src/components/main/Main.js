import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import GetTime from '../../utils/GetTime'
import Time from './count/Time'
import Count from './count/Count';
import Go from './Go';
import Timeline from './timeline/Timeline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';

const Main = ({ goMain }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [start, setStart] = useState(false)
    const [isFull, setIsFull] = useState(false)
    const reffie = useRef()
    const handle = useRef()

    const toggleFullScreen = () => {
      setIsFull(true)
     if (handle.current.requestFullscreen) {
       console.log(handle.current)
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
      setIsFull(false)
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
      if(start === true){
        setTimeout(() => setStart(false), 1005)
      }

      return () => clearTimeout()
    })

    const isHoveringTrue = () => {
        setIsHovering(true)
    }

    const isHoveringFalse = () => {
        setIsHovering(false)
    }

    const startCountDown = () => {
        setIsCounting(true)
    }

    const stopCountDown = () => {
        setIsCounting(false)
        stopFullScreen()
    }

    const scrollSmoothHandler = () => {
      setStart(true)
      setTimeout(() => reffie.current.scrollIntoView({ behavior: "smooth" }), 1005);
    }
  return (
    <div className='main flex_middle' ref={handle}>
      <div className='app'>
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
          <Tooltip title='Expand' placement='top'>
            <div
              className='expand-icon cursor_pointer'
              onClick={toggleFullScreen}
            >
              <FontAwesomeIcon
                icon={faExpandAlt}
                style={{ fontSize: 20, color: "gray" }}
              />
            </div>
          </Tooltip>
        )}
        {start && <div className='go-down' ref={reffie}></div>}
      </div>
    </div>
  );
};

Main.propTypes = {};

export default Main;
