import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';

const Element = ({ duration, type }) => {
    const [classy, setClassy] = useState('')
    const [showInHours, setShowInHours] = useState(false)

    useEffect(() => {
      if(duration){
          switch (true) {
            case duration <= 300000:
              return setClassy("mini");
            case 300000 < duration && duration <= 900000:
              return setClassy("tiny");
            case 900000 < duration && duration <= 1800000:
              return setClassy("extra-small");
            case 1800000 < duration && duration <= 3600000:
              return setClassy("small");
            case 3600000 < duration && duration <= 7200000:
              return setClassy("medium");
            case 7200000 < duration && duration <= 14400000:
              return setClassy("large");
            case 14400000 < duration:
              return setClassy("humongous");
            default:
              return null;
          }
      }
    
    }, [classy, duration]);
    
  return (
    <>
      {type % 2 === 0 ? (
        <div>
          <Tooltip title={showInHours ? "Hours" : "Minutes"} placement='top'>
            <div
              className={`element_${classy} flex_middle cursor_pointer`}
              onClick={() => setShowInHours(!showInHours)}
            >
              {showInHours
                ? (duration / 3600000).toFixed("2")
                : (duration / 60000).toFixed("2")}
            </div>
          </Tooltip>
          <Tooltip>
            
          </Tooltip>
        </div>
      ) : (
        <div>
          <Tooltip title={showInHours ? "Hours" : "Minutes"} placement='top'>
            <div
              className={`element_${classy} flex_middle cursor_pointer`}
              onClick={() => setShowInHours(!showInHours)}
            >
              {showInHours
                ? (duration / 3600000).toFixed("2")
                : (duration / 60000).toFixed("2")}
            </div>
          </Tooltip>
          <Tooltip>
            <div className={`liner_${classy} cursor_pointer`}></div>
          </Tooltip>
        </div>
      )}
    </>
  )
}

Element.propTypes = {};

export default Element;
