import React from 'react'
import PropTypes from 'prop-types'

const Para = ({ srNo }) => {
  return (
    <div className='walkthrough-para'>
        <div className="title-para flex_middle">
            <span style={{ marginRight: '0.3em' }}>{srNo}.</span> Whats the need for security questions during registration?
        </div>
        <div className="image-para">
            <img src="" alt="" />
        </div>
        <div className="caption">
        <ul>
            <li>Security questions are used if you forget your password.</li>
            <li>Always keep the answers to your security questions stored securely.</li>
        </ul>
        </div>
    </div>
  )
}

Para.propTypes = {}

export default Para