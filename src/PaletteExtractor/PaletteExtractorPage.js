import React from 'react'
import PaletteGenerator from './PaletteGenerator'
import ImageInput from './ImageInput'
import PickedColors from '../ColorWheel/PickedColors/PickedColors'
import './styles/PaletteGeneratorPage.css'
import { useColorState, useImgState } from '../App'

const PaletteExtractorPage = () => {
  const [imgUrl] = useImgState()
  const [colors, setColors] = useColorState()
  console.log(imgUrl)

  return (
    <div className="generatorPageWrapper">
      <div className="imageInputContainer">
        <ImageInput />
      </div>
      <PaletteGenerator
        data-testid={'generator'}
        imgUrl={imgUrl.imgUrl}
        passColors={setColors}
      />
      {colors && <PickedColors pickedColors={colors} />}
    </div>
  )
}

export default PaletteExtractorPage
