import React from 'react'
import CloseIcon from "@mui/icons-material/Close";

const MaxGif = ({ close, image, altImg, title }) => {
  return (
    <div className='max-gif-card app'>
        <div className="triple_grid">
            <div></div>
            <div className='title' >
                {title}
            </div>
            <div>
                <CloseIcon onClick={close} className='cancel cursor_pointer' />
            </div>
        </div>
    </div>
  )
}

export default MaxGif