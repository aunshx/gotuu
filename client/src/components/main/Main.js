import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

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
    }

    const scrollSmoothHandler = () => {
      setStart(true)
      console.log('YE')
      setTimeout(() => reffie.current.scrollIntoView({ behavior: "smooth" }), 1005);
    }
  return (
    <div className='main flex_middle'>
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
