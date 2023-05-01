import React, { useEffect } from 'react'
import './styles/PaletteCounter.css'

const PaletteCounter = ({ passQuantity, quantity, bottomLimit, topLimit }) => {
  useEffect(() => {
    if (quantity < bottomLimit) {
      passQuantity(bottomLimit)
    } else if (quantity > topLimit) {
      passQuantity(topLimit)
    }
  }, [bottomLimit, topLimit])

  const quantityChangeHandler = (value) => {
    let newQuantity = quantity + value
    console.log(newQuantity)
    if (newQuantity >= bottomLimit && newQuantity <= topLimit) {
      passQuantity(newQuantity)
    }
  }

  return (
    <div className="counterWrapper">
      <button
        id="decColorQuantity"
        className="handleButton"
        onClick={() => {
          quantityChangeHandler(-1)
        }}
      >
        -
      </button>
      <div className="colorQuantity">
        <p>{quantity}</p>
      </div>
      <button
        id="incColorQuantity"
        className="handleButton"
        onClick={() => {
          quantityChangeHandler(+1)
        }}
      >
        +
      </button>
    </div>
  )
}

export default PaletteCounter
