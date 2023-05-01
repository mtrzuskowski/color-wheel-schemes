import React, { useEffect, useState } from 'react'
import { coordinatesToHS, hsToCoordinates } from '../helpers/utils'
import Handle from '../ColorHandle'
import { addMonochromeHandles } from './CombUtils.js'

const CombComplement = ({
  main_x,
  main_y,
  setColors,
  size,
  quantity,
  luminance,
}) => {
  const [coordinates, setCoordinates] = useState([])
  const baseQty = 2
  useEffect(() => {
    let newHandlesCoordinates = []
    let hsCoordinates = []

    newHandlesCoordinates.push([main_x, main_y])
    newHandlesCoordinates.push([
      (size - main_x * size) / size,
      (size - main_y * size) / size,
    ])

    const mainHS = coordinatesToHS(main_x, main_y)
    mainHS.l = luminance
    const suppHS = coordinatesToHS(
      (size - main_x * size) / size,
      (size - main_y * size) / size,
    )
    suppHS.l = luminance

    hsCoordinates.push(mainHS, suppHS)

    addMonochromeHandles(
      hsCoordinates,
      newHandlesCoordinates,
      quantity,
      baseQty,
    )

    setCoordinates(newHandlesCoordinates)
    setColors(hsCoordinates)
  }, [main_x, main_y, quantity, size, luminance])

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
      <Handle x={size - main_x * size} y={size - main_y * size} size={size} />
      {coordinates.length > 2
        ? coordinates.slice(2, coordinates.length).map((coord) => {
            return (
              <Handle
                x={coord[0] * size}
                y={coord[1] * size}
                size={size}
                key={Math.random()}
              />
            )
          })
        : null}
    </div>
  )
}

export default CombComplement
