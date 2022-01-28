import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FullScreen, useFullScreenHandle } from "react-full-screen";

import GetTime from '../../utils/GetTime'
import Time from './count/Time'
import Count from './count/Count';
import Go from './Go';
import Timeline from './timeline/Timeline';

const Main = ({ goMain }) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isCounting, setIsCounting] = useState(false)
    const [start, setStart] = useState(false)
    const reffie = useRef()
    const handle = useRef()

    const toggleFullScreen = () => {
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
     if (document.exitFullscreen) {
       console.log("nnnnnnnnnnnnnnnn", document);
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
        toggleFullScreen()
    }

    const stopCountDown = () => {
        setIsCounting(false)
        stopFullScreen()
        console.log('STOPPPPED')
    }

    const scrollSmoothHandler = () => {
      setStart(true)
      console.log('YE')
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
        {start && <div className='go-down' ref={reffie}></div>}
      </div>
    </div>
  );
};

Main.propTypes = {};

export default Main;
