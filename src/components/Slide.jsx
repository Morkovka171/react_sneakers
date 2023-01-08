import React from 'react'

const Slide = ({image, title, onBtnClick, wrapperStyles = {}, buttonStyles = {} }) => {
  return (
    <div style={{backgroundImage: `url(${image})`, ...wrapperStyles}} className='slideWrapper'>
      <div className='slideContentWrapper' >
      {title}
      <button onClick={onBtnClick} style={{...buttonStyles}}>Купить</button>
      </div>
    </div>
  )
}

export default Slide;