import React, { useEffect, useState } from 'react'
import { coordinatesToHS, hsToCoordinates } from '../helpers/utils'
import { addMonochromeHandles } from './CombUtils.js'
import Handle from '../ColorHandle'

const CombDoubleSplitComplementary = ({
  main_x,
  main_y,
  setColors,
  size,
  quantity,
  luminance,
}) => {
  const [coordinates, setCoordinates] = useState([])
  const baseQty = 5

  useEffect(() => {
    let newHandlesCoordinates = []
    let hsCoordinates = []

    newHandlesCoordinates.push([main_x, main_y])

    const mainHS = coordinatesToHS(main_x, main_y)

    const leftTopHS =
      mainHS.h - 30 > 0
        ? { h: mainHS.h - 30, s: mainHS.s }
        : { h: 330 + mainHS.h, s: mainHS.s }
    const rightTopHS =
      mainHS.h + 30 < 360
        ? { h: mainHS.h + 30, s: mainHS.s }
        : { h: (mainHS.h + 30) % 360, s: mainHS.s }
    const leftBottomHS =
      mainHS.h - 150 > 0
        ? { h: mainHS.h - 150, s: mainHS.s }
        : { h: 210 + mainHS.h, s: mainHS.s }
    const rightBottomHS =
      mainHS.h + 150 < 360
        ? { h: mainHS.h + 150, s: mainHS.s }
        : { h: (mainHS.h + 150) % 360, s: mainHS.s }

    mainHS.l = luminance
    leftTopHS.l = luminance
    rightTopHS.l = luminance
    leftBottomHS.l = luminance
    rightBottomHS.l = luminance

    let leftTopCoords = hsToCoordinates(leftTopHS.h, leftTopHS.s)
    let rightTopCoords = hsToCoordinates(rightTopHS.h, rightTopHS.s)
    let leftBottomCoords = hsToCoordinates(leftBottomHS.h, leftBottomHS.s)
    let rightBottomCoords = hsToCoordinates(rightBottomHS.h, rightBottomHS.s)

    newHandlesCoordinates.push(
      [leftTopCoords.x, leftTopCoords.y],
      [rightTopCoords.x, rightTopCoords.y],
      [leftBottomCoords.x, leftBottomCoords.y],
      [rightBottomCoords.x, rightBottomCoords.y],
    )

    hsCoordinates.push(
      mainHS,
      leftTopHS,
      rightTopHS,
      leftBottomHS,
      rightBottomHS,
    )

    addMonochromeHandles(
      hsCoordinates,
      newHandlesCoordinates,
      quantity,
      baseQty,
    )

    // for (let i = 4; i < quantity; i++) {
    //   const factor = 0.2 * mainHS.s * Math.floor(i / 3)
    //   const newHandleHS = JSON.parse(JSON.stringify(hsCoordinates[i % 3]))
    //   newHandleHS.s -= factor
    //   const newHandleCoord = hsToCoordinates(newHandleHS.h, newHandleHS.s)
    //   hsCoordinates.push(newHandleHS)
    //   newHandlesCoordinates.push([newHandleCoord.x, newHandleCoord.y])
    // }
    // console.log(newHandlesCoordinates, hsCoordinates)

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

export default CombDoubleSplitComplementary
