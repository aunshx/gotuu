import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags } from "@fortawesome/free-solid-svg-icons";

const Tags = ({ title }) => {
  return (
    <div className='tags'>
        <span style={{ marginRight: '0.3em' }}><FontAwesomeIcon icon={faTags} style={{ fontSize: 10 }} /></span> {title}
    </div>
  )
}

export default Tags