import React from 'react'
import './styles/RadioOptions.css'

const RadioOptions = ({ title, values, passOption }) => {
  const [value, setValue] = React.useState(values[0].label)
  const radioChangehandler = (e) => {
    setValue(e.currentTarget.id)

    passOption(values.find((value) => value.label === e.currentTarget.id))
  }

  return (
    <div className="optionsWrapper">
      <div className="title">{title}</div>
      <div className="radioBox">
        {values.map((option) => {
          return (
            <div
              className="buttonWrapper"
              key={option.label}
              onClick={radioChangehandler}
              id={option.label}
            >
              <input type="radio" label={option.label} id={option.label} />
              <label
                htmlFor={option.label}
                data-testid={option.label}
                className={`${value === option.label ? 'checked' : ''} box `}
              >
                <div className="option">
                  <span className="circle"></span>
                </div>
                <span className="optionName">{option.label}</span>
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RadioOptions
