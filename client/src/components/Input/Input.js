

import React from 'react'
import PropTypes from 'prop-types'
import { InputStyleDark, InputStyleLight } from './styles';


const Input = props => {
  const { darkMode, value, onChange, placeholder } = props
  return (
    <div>
      {
        darkMode ?
          <InputStyleDark
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)} />
          :
          <InputStyleLight
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  )
}

Input.propTypes = {
  darkMode: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string

}

export default Input
