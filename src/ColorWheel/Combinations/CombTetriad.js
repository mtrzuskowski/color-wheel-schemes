import React, { useEffect, useState } from 'react'
import { coordinatesToHS, hsToCoordinates } from '../helpers/utils'
import Handle from '../ColorHandle'
import { addMonochromeHandles } from './CombUtils.js'

const CombTetriad = ({
  main_x,
  main_y,
  setColors,
  size,
  quantity,
  luminance,
}) => {
  const [coordinates, setCoordinates] = useState([])
  const baseQty = 4
  useEffect(() => {
    let newHandlesCoordinates = []
    let hsCoordinates = []

    newHandlesCoordinates.push([main_x, main_y])
    newHandlesCoordinates.push([
      (size - main_x * size) / size,
      (size - main_y * size) / size,
    ])

    const mainHS = coordinatesToHS(main_x, main_y)
    const suppHS = coordinatesToHS(
      (size - main_x * size) / size,
      (size - main_y * size) / size,
    )
    mainHS.l = luminance
    suppHS.l = luminance

    const leftHS =
      mainHS.h - 90 > 0
        ? { h: mainHS.h - 90, s: mainHS.s }
        : { h: 270 + mainHS.h, s: mainHS.s }
    const rightHS =
      mainHS.h + 90 < 360
        ? { h: mainHS.h + 90, s: mainHS.s }
        : { h: (mainHS.h + 90) % 360, s: mainHS.s }

    let leftCoords = hsToCoordinates(leftHS.h, leftHS.s)
    let rightCoords = hsToCoordinates(rightHS.h, rightHS.s)
    leftHS.l = luminance
    rightHS.l = luminance

    newHandlesCoordinates.push(
      [leftCoords.x, leftCoords.y],
      [rightCoords.x, rightCoords.y],
    )

    hsCoordinates.push(mainHS, suppHS, leftHS, rightHS)

    addMonochromeHandles(
      hsCoordinates,
      newHandlesCoordinates,
      quantity,
      baseQty,
    )

    setCoordinates(newHandlesCoordinates)
    setColors(hsCoordinates)
  }, [main_x, main_y, quantity, setColors, size, luminance])

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

export default CombTetriad
