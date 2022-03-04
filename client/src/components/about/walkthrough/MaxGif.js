import React from 'react'
import CloseIcon from "@mui/icons-material/Close";

const MaxGif = ({ close, image, altImg, title }) => {
  return (
    <div className='max-gif-card'>
      <div className='triple_grid'>
        <div></div>
        <div className='title flex_middle'>{title}</div>
        <div className='flex_right icons'>
          <CloseIcon onClick={close} className='cancel cursor_pointer' style={{ fontSize: 18 }} />
        </div>
      </div>
      <div className='flex_middle'>
        <img src={image} alt={altImg} />
      </div>
    </div>
  );
}

export default MaxGif