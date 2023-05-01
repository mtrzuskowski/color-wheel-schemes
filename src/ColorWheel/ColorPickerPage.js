import React, { useCallback, useState, useEffect } from 'react'
import ColorPicker from './ColorPicker'
import PickedColors from './PickedColors/PickedColors'
import 'react-dropdown/style.css'
import './styles/ColorPickerPage.css'
import PaletteSettings from './PaletteSettings/PaletteSettings'
import { hslToRgb, rgbToHex } from './helpers/utils'
import { useColorState, useImgState } from '../App'

const ColorPickerPage = () => {
  const [combination, setCombination] = useState({
    label: 'Complementary',
    value: 'Complementary',
    bottomLimit: 2,
    upperLimit: 10,
  })
  const [colorQuantity, setColorQuantity] = useState(2)
  const [colors, setColors] = useColorState()
  const [sliderColor, setSliderColor] = useState('#FF0000')
  const [imgUrl, setImgUrl] = useImgState()

  useEffect(() => {
    setImgUrl((prevState) => ({
      imgUrl: prevState.imgUrl,
      active: false,
    }))
  }, [])

  const changeColorsHandler = useCallback(
    (hslColors) => {
      const newColors = []
      for (let i = 0; i < hslColors.length; i++) {
        let hsl = hslColors[i]
        let rgb = hslToRgb(hsl.h, hsl.s, hsl.l)
        let hex = rgbToHex(rgb.r, rgb.g, rgb.b)
        newColors.push({
          hex: hex,
          l: hsl.l,
        })
      }
      let sliderRGB = hslToRgb(hslColors[0].h, hslColors[0].s, 50)
      let sliderHex = rgbToHex(sliderRGB.r, sliderRGB.g, sliderRGB.b)
      setSliderColor(sliderHex)
      setColors(newColors)
    },
    [setColors],
  )

  const updateCombination = useCallback((comb) => {
    setCombination(comb)
  }, [])
  const updateQuantity = useCallback((comb) => {
    setColorQuantity(comb)
  }, [])

  return (
    <div className="colorPickerPageContainer">
      <PaletteSettings
        passCombination={updateCombination}
        passColorQuantity={updateQuantity}
        quantity={colorQuantity}
        currentComb={combination}
      />
      <ColorPicker
        passPickedColors={changeColorsHandler}
        combination={combination.label}
        colorQuantity={colorQuantity}
        sliderColor={sliderColor}
      ></ColorPicker>

      <PickedColors pickedColors={colors} />
    </div>
  )
}

export default ColorPickerPage
