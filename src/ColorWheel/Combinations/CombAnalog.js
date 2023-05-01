import React, { useEffect, useState } from 'react'
import { coordinatesToHS } from '../helpers/utils'
import Handle from '../ColorHandle'
import { addMonochromeHandles, spreadHandles } from './CombUtils.js'

const CombAnalog = ({
  main_x,
  main_y,
  setColors,
  size,
  quantity,
  luminance,
}) => {
  const [coordinates, setCoordinates] = useState([])
  const [spread, setSpread] = useState(20)
  const baseQty = 3

  useEffect(() => {
    let newHandlesCoordinates = []
    let hsCoordinates = []

    newHandlesCoordinates.push([main_x, main_y])
    const mainHS = coordinatesToHS(main_x, main_y)

    hsCoordinates.push(mainHS)
    const [suppHandlesCoords, suppHandlesHS] = spreadHandles(
      mainHS,
      spread,
      quantity,
    )
    mainHS.l = luminance
    suppHandlesHS.forEach((HS) => {
      HS.l = luminance
    })
    newHandlesCoordinates = [...newHandlesCoordinates, ...suppHandlesCoords]
    hsCoordinates = [...hsCoordinates, ...suppHandlesHS]
    if (quantity > 5) {
      addMonochromeHandles(hsCoordinates, newHandlesCoordinates, quantity, 5)
    }
    setCoordinates(newHandlesCoordinates)
    setColors(hsCoordinates)
  }, [main_x, main_y, quantity, setColors, size, spread, luminance])

  return (
    <div className="combination">
      <div
        className="handle"
        style={{
          top: main_y * size,
          left: main_x * size,
          width: size / 15,
          height: size / 15,
          pointerEvents: 'none',
        }}
      ></div>
      {coordinates.slice(1, coordinates.length).map((coord) => {
        return (
          <Handle
            x={coord[0] * size}
            y={coord[1] * size}
            size={size}
            key={Math.random()}
            onClick={(event) => {
              console.log(event.target)
            }}
          />
        )
      })}
    </div>
  )
}

export default CombAnalog
