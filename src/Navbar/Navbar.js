import { useState } from 'react'
import { Link as LinkR } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [activeButton, setActiveButton] = useState('')

  const linksList = [
    { id: 'wheel', path: 'wheel' },
    { id: 'generator', path: 'generator' },
  ]

  const handleButtonClick = (event) => {
    console.log(event.target.id)
    if (activeButton !== event.target.id) {
      setActiveButton(event.target.id)
    }
  }
  console.log(activeButton)

  return (
    <nav className="nav">
      <div className="container">
        <LinkR className="logo" to="/">
          PaletteArt
        </LinkR>
        <ul className="navMenu">
          {linksList.map((link) => {
            return (
              <li
                onClick={(e) => {
                  handleButtonClick(e)
                }}
                key={link.id}
              >
                <LinkR
                  id={link.id}
                  className={`link ${link.id === activeButton ? 'active' : ''}`}
                  to={`/${link.path}`}
                >
                  {link.path}
                </LinkR>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
