import React from 'react'

const Slide = ({image, title, onBtnClick}) => {
  return (
    <div style={{backgroundImage: `url(${image})`}} className='slideWrapper'>
      <div className='slideContentWrapper'>
      {title}
      <button onClick={onBtnClick}>Купить</button>
      </div>
    </div>
  )
}

export default Slide;