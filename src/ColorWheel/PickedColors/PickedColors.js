import React from 'react'
import PickedColor from './PickedColor'
import './styles/PickedColors.css'

const PickedColors = ({ pickedColors }) => {
  return (
    <div className="pickedColorsContainer" data-testid="picked">
      <div className="pickedColorsWrapper">
        {pickedColors.map((color) => (
          <PickedColor
            hex={color.hex}
            luminance={pickedColors[0].l}
            key={Math.random()}
          />
        ))}
      </div>
    </div>
  )
}

export default PickedColors
