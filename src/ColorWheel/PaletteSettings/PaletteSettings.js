import React from 'react'
import RadioOptions from './RadioOptions'
import PaletteCounter from './PaletteCounter'

import './styles/PaletteSettings.css'

const options = [
  {
    label: 'Complementary',
    bottomLimit: 2,
    upperLimit: 8,
  },
  {
    label: 'Analog',
    bottomLimit: 3,
    upperLimit: 10,
  },
  {
    label: 'Triad',
    bottomLimit: 3,
    upperLimit: 9,
  },
  {
    label: 'Tetriad',
    bottomLimit: 4,
    upperLimit: 8,
  },
  {
    label: 'Split Complementary',
    bottomLimit: 3,
    upperLimit: 9,
  },
  {
    label: 'Double Split Complementary',
    bottomLimit: 5,
    upperLimit: 10,
  },
]

const PaletteSettings = ({
  quantity,
  passColorQuantity,
  passCombination,
  currentComb,
}) => {
  return (
    <div className="settingsContainer" data-testid={'settings'}>
      <div className="settingsWrapper">
        <div className="combContainer">
          <RadioOptions
            title="Choose color combination"
            values={options}
            passOption={passCombination}
          />
        </div>
        <div className="counterContainer">
          <div className="counterTitle">Choose color quantity</div>
          <PaletteCounter
            quantity={quantity}
            passQuantity={passColorQuantity}
            bottomLimit={currentComb.bottomLimit}
            topLimit={currentComb.upperLimit}
          />
        </div>
      </div>
    </div>
  )
}

export default PaletteSettings
