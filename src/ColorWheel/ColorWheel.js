import React, { useEffect, useRef, useState } from 'react'
import './styles/ColorWheel.css'
import { coordinatesToHS, hsToCoordinates } from './helpers/utils'
import CombComplementary from './Combinations/CombComplementary'
import CombTetriad from './Combinations/CombTetriad'
import CombTriad from './Combinations/CombTriad'
import CombDoubleSplitComplementary from './Combinations/CombDoubleSplitComplementary'
import CombAnalog from './Combinations/CombAnalog'
import CombSplitComplementary from './Combinations/CombSplitComplementary'
import { CircleSlider } from './BrightnessRange/CircleSlider'

const rangeToLuminance = (value) => {
  let luminance = 50
  if (value <= 50) {
    luminance = -2 * value + 100
  } else {
    luminance = 2 * value - 100
  }
  return luminance
}
const ColorWheel = ({
  size,
  setColors,
  quantity,
  brightnessWheelColor,
  combination,
}) => {
  const wheel = useRef(null)
  const [editing, setEditing] = useState(false)
  const [mouseCoordinates, setMouseCoordinates] = useState({ x: 0.25, y: 0.75 })
  const [wheelCoordinates, setWheelCoordinates] = useState({
    x: 0.25,
    y: 0.75,
  })
  const [rangeValue, setRangeValue] = useState(25)

  const handleRangeValue = (value) => {
    setRangeValue(value)
  }

  useEffect(() => {
    const mouseDown = (event) => {
      if (wheel.current.contains(event.target)) {
        setMouseCoordinates({
          x: (event.clientX - wheel.current.getBoundingClientRect().x) / size,
          y: (event.clientY - wheel.current.getBoundingClientRect().y) / size,
        })
        const { h, s } = coordinatesToHS(mouseCoordinates.x, mouseCoordinates.y)
        setWheelCoordinates(hsToCoordinates(h, s))
        setEditing(true)
      } else setEditing(false)
    }

    const mouseUp = () => {
      setEditing(false)
    }
    const mouseMove = (event) => {
      if (editing) {
        setMouseCoordinates({
          x: (event.clientX - wheel.current.getBoundingClientRect().x) / size,
          y: (event.clientY - wheel.current.getBoundingClientRect().y) / size,
        })
        const { h, s } = coordinatesToHS(mouseCoordinates.x, mouseCoordinates.y)
        setWheelCoordinates(hsToCoordinates(h, s))
      }
    }

    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mousedown', mouseDown)
    window.addEventListener('mouseup', mouseUp)
    return () => {
      window.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mouseup', mouseUp)
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [
    mouseCoordinates.x,
    mouseCoordinates.y,
    editing,
    setColors,
    size,
    wheelCoordinates,
    setWheelCoordinates,
    quantity,
  ])

  return (
    <div
      className="colorWheel"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <CircleSlider
        size={size + (1 / 5) * size}
        value={rangeValue}
        onChange={handleRangeValue}
        circleColor={brightnessWheelColor}
      />
      <div
        ref={wheel}
        className="wheel"
        role="button"
        data-testid="wheel"
        style={{
          position: 'absolute',
          top: '0px',
        }}
      >
        {combination === 'Complementary' ? (
          <CombComplementary
            main_x={wheelCoordinates.x}
            main_y={wheelCoordinates.y}
            setColors={setColors}
            size={size}
            luminance={rangeToLuminance(rangeValue)}
            quantity={quantity}
          />
        ) : combination === 'Analog' ? (
          <CombAnalog
            main_x={wheelCoordinates.x}
            main_y={wheelCoordinates.y}
            setColors={setColors}
            size={size}
            luminance={rangeToLuminance(rangeValue)}
            quantity={quantity}
          />
        ) : combination === 'Triad' ? (
          <CombTriad
            main_x={wheelCoordinates.x}
            main_y={wheelCoordinates.y}
            setColors={setColors}
            size={size}
            luminance={rangeToLuminance(rangeValue)}
            quantity={quantity}
          />
        ) : combination === 'Tetriad' ? (
          <CombTetriad
            main_x={wheelCoordinates.x}
            main_y={wheelCoordinates.y}
            setColors={setColors}
            size={size}
            luminance={rangeToLuminance(rangeValue)}
            quantity={quantity}
          />
        ) : combination === 'Split Complementary' ? (
          <CombSplitComplementary
            main_x={wheelCoordinates.x}
            main_y={wheelCoordinates.y}
            setColors={setColors}
            size={size}
            luminance={rangeToLuminance(rangeValue)}
            quantity={quantity}
          />
        ) : combination === 'Double Split Complementary' ? (
          <CombDoubleSplitComplementary
            main_x={wheelCoordinates.x}
            main_y={wheelCoordinates.y}
            setColors={setColors}
            size={size}
            luminance={rangeToLuminance(rangeValue)}
            quantity={quantity}
          />
        ) : (
          <CombAnalog
            main_x={wheelCoordinates.x}
            main_y={wheelCoordinates.y}
            setColors={setColors}
            size={size}
            luminance={rangeToLuminance(rangeValue)}
            quantity={quantity}
          />
        )}
      </div>
    </div>
  )
}

export default ColorWheel
