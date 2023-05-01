import React from 'react'
import './styles/PickedColor.css'

const PickedColor = ({ hex, luminance }) => {
  return (
    <div className="pickedColorWrapper">
      <div
        className="pickedColor"
        style={{
          backgroundColor: hex,
        }}
      >
        <div
          className="hexValue"
          style={{
            fontSize: 60,
            color: luminance > 70 ? 'black' : 'white',
          }}
        >
          {}
        </div>
      </div>
    </div>
  )
}

export default PickedColor
