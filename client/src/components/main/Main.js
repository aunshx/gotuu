import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import GetTime from '../../utils/GetTime'
import Time from './count/Time'
import Count from './count/Count';
import Go from './Go';

const Main = (props) => {
    const [isHovering, setIsHovering] = useState(false)
    const [isCounting, setIsCounting] = useState(false)

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
  return (
    <div className='main flex_middle'>
      {isCounting ? (
        <Count
          isCounting={isCounting}
          isHovering={isHovering}
          isHoveringTrue={isHoveringTrue}
          isHoveringFalse={isHoveringFalse}
          stopCountDown={stopCountDown}
        />
      ) : (
        <Go
          isHovering={isHovering}
          isHoveringTrue={isHoveringTrue}
          isHoveringFalse={isHoveringFalse}
          startCountDown={startCountDown}
        />
      )}
    </div>
  );
};

Main.propTypes = {};

export default Main;
