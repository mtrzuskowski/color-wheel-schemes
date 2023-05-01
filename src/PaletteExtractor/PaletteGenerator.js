import { useEffect } from 'react'
import Vibrant from 'node-vibrant'

const PaletteGenerator = ({ imgUrl, passColors }) => {
  useEffect(() => {
    console.log(imgUrl)
    Vibrant.from(imgUrl)
      .getSwatches()
      .then((swatches) => {
        let palette = []
        for (let swatch in swatches) {
          palette.push({
            hex: swatches[swatch].getHex(),
            l: swatches[swatch].getHsl().l,
          })
        }
        passColors(palette)
      })
  }, [imgUrl, passColors])

  return null
}
export default PaletteGenerator
