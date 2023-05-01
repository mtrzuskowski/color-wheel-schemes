/* eslint-disable no-unused-vars */
import React from 'react'
import 'react-dropdown/style.css'
import './App.css'
import Navbar from './Navbar/Navbar'
import ColorPickerPage from './ColorWheel/ColorPickerPage'
import { Routes, Route } from 'react-router-dom'
import PaletteExtractorPage from './PaletteExtractor/PaletteExtractorPage'

const imgPlaceHolder =
  'https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg'

const colorInitialState = {
  colors: [
    { hex: '#FF0000', l: 50 },
    { hex: '#00FF00', l: 50 },
  ],
  setColors: undefined,
}
const imgInitialState = {
  imgUrl: { imgUrl: imgPlaceHolder },
  setImageUrl: undefined,
}

const ColorStateContext = React.createContext(colorInitialState)
const ImgStateContent = React.createContext(imgInitialState)

export const GlobalStateProvider = ({ children }) => {
  const [colors, setColors] = React.useState(colorInitialState.colors)
  const [imgUrl, setImgUrl] = React.useState(imgInitialState.imgUrl)
  const colorContextValue = React.useMemo(() => [colors, setColors], [colors])
  const imgContextValue = React.useMemo(() => [imgUrl, setImgUrl], [imgUrl])

  return (
    <ColorStateContext.Provider value={colorContextValue}>
      <ImgStateContent.Provider value={imgContextValue}>
        {children}
      </ImgStateContent.Provider>
    </ColorStateContext.Provider>
  )
}

export const useColorState = () => React.useContext(ColorStateContext)
export const useImgState = () => React.useContext(ImgStateContent)
const App = () => {
  return (
    <GlobalStateProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ColorPickerPage />} />
        <Route path="/wheel" element={<ColorPickerPage />} />
        <Route path="/generator" element={<PaletteExtractorPage />} />
      </Routes>
    </GlobalStateProvider>
  )
}

export default App
