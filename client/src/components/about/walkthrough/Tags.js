import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

const Tags = ({ title }) => {
  return (
    <div className='tags flex_evenly'>
        <div style={{ marginRight: '0.3em' }}><FontAwesomeIcon icon={faTags} style={{ fontSize: 10 }} /></div>
        <div>
          {title}
        </div>
    </div>
  )
}

export default Tags