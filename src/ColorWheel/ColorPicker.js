/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from 'react'
import './styles/ColorPicker.css'
import ColorWheel from './ColorWheel'

const ColorPicker = ({
  colorQuantity,
  passPickedColors,
  sliderColor,
  combination,
}) => {
  return (
    <div className="colorSegmentContainer" data-testid={'picker'}>
      <div className="colorSegmentWrapper">
        <div className="colorWheelWrapper">
          <ColorWheel
            size={500}
            setColors={passPickedColors}
            quantity={colorQuantity}
            brightnessWheelColor={sliderColor}
            combination={combination}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
