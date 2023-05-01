import React, { useEffect, useState } from 'react'
import { coordinatesToHS, hsToCoordinates } from '../helpers/utils'
import { addMonochromeHandles } from './CombUtils.js'
import Handle from '../ColorHandle'

const CombTriad = ({
  main_x,
  main_y,
  setColors,
  size,
  quantity,
  luminance,
}) => {
  const [coordinates, setCoordinates] = useState([])
  const baseQty = 3
  useEffect(() => {
    let newHandlesCoordinates = []
    let hsCoordinates = []

    newHandlesCoordinates.push([main_x, main_y])

    const mainHS = coordinatesToHS(main_x, main_y)

    const leftHS =
      mainHS.h - 120 > 0
        ? { h: mainHS.h - 120, s: mainHS.s }
        : { h: 240 + mainHS.h, s: mainHS.s }
    const rightHS =
      mainHS.h + 120 < 360
        ? { h: mainHS.h + 120, s: mainHS.s }
        : { h: (mainHS.h + 120) % 360, s: mainHS.s }

    mainHS.l = luminance
    leftHS.l = luminance
    rightHS.l = luminance

    let leftCoords = hsToCoordinates(leftHS.h, leftHS.s)

    let rightCoords = hsToCoordinates(rightHS.h, rightHS.s)
    newHandlesCoordinates.push(
      [leftCoords.x, leftCoords.y],
      [rightCoords.x, rightCoords.y],
    )

    hsCoordinates.push(mainHS, leftHS, rightHS)

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
      {coordinates.slice(1, coordinates.length).map((coord) => {
        return (
          <Handle
            x={coord[0] * size}
            y={coord[1] * size}
            size={size}
            key={Math.random()}
          />
        )
      })}
    </div>
  )
}

export default CombTriad
