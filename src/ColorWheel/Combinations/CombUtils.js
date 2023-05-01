import { hsToCoordinates } from '../helpers/utils'

export const spreadHandles = (baseHS, spread, quantity) => {
  const suppHandlesHS = []

  let actualQuantity = quantity < 5 ? quantity : 5
  for (let i = 0; i < actualQuantity - 1; i++) {
    let newHandle
    let actualSpread = spread * (Math.floor(i / 2) + 1) //
    if (i % 2 === 0) {
      newHandle =
        baseHS.h - actualSpread > 0
          ? { h: baseHS.h - actualSpread, s: baseHS.s, l: baseHS.l, key: i }
          : {
              h: 360 - actualSpread + baseHS.h,
              s: baseHS.s,
              l: baseHS.l,
              key: i,
            }
    } else {
      newHandle =
        baseHS.h + actualSpread < 360
          ? { h: baseHS.h + actualSpread, s: baseHS.s, l: baseHS.l, key: i }
          : {
              h: (baseHS.h + actualSpread) % 360,
              s: baseHS.s,
              l: baseHS.l,
              key: i,
            }
    }
    suppHandlesHS.push(newHandle)
  }
  const suppHandlesCoords = suppHandlesHS.map((hs) => {
    const coords = hsToCoordinates(hs.h, hs.s)
    return [coords.x, coords.y]
  })

  return [suppHandlesCoords, suppHandlesHS]
}

export const addMonochromeHandles = (
  baseHandlesHS,
  baseHandleCoords,
  quantity,
  baseQty,
) => {
  const newHandlesCoordinates = []
  const hsCoordinates = []

  for (let i = 0; i < quantity - baseQty; i++) {
    const factor =
      0.2 * baseHandlesHS[i % baseQty].s * (Math.floor(i / baseQty) + 1)
    const newHandleHS = JSON.parse(JSON.stringify(baseHandlesHS[i % baseQty]))
    newHandleHS.s -= factor
    newHandleHS.l -= i % 2 === 0 ? -10 : 10
    const newHandleCoord = hsToCoordinates(newHandleHS.h, newHandleHS.s)
    hsCoordinates.push(newHandleHS)
    newHandlesCoordinates.push([newHandleCoord.x, newHandleCoord.y])
  }
  baseHandlesHS.push(...hsCoordinates)
  baseHandleCoords.push(...newHandlesCoordinates)
}
