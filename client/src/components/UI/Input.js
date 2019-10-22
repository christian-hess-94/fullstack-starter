import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { borderRadius, borderWidth, padding, textFontSize, margin, paddingHorizontal, paddingVertical } from '../../styles/Dimens'
import { lightBorderColor, lightInputTextColor, lightInputPlaceholderColor, lightInputBackgroundColorFocus } from '../../styles/LightModeColors'
import { darkBorderColor, darkInputTextColor, darkInputPlaceholderColor, darkInputBackgroundColorFocus } from '../../styles/DarkModeColors'
import { ThemeContext } from '../../App'

const Input = props => {

	const { darkMode } = useContext(ThemeContext)
	console.log('darkMode: ', darkMode)
	return <InputStyle {...props} darkMode={darkMode} />
}

Input.propTypes = {
	darkMode: PropTypes.bool,
	block: PropTypes.bool,
}

const InputStyle = styled.input`
	background-color: transparent;
	border-radius: ${borderRadius}px;
	border: ${borderWidth}px solid ${props => (props.darkMode ? darkBorderColor : lightBorderColor)};
	font-size: ${textFontSize}px;
	
	padding: ${padding}px;
	color: ${props => (props.darkMode ? darkInputTextColor : lightInputTextColor)};
	display: block;
	margin: ${props => (props.block ? `${margin}px auto` : `${margin}px`)};
	width: ${props => (props.block ? `80%` : `fit-content`)};
	padding-left: 24px;
	
    transition: all 500ms ease;
	:hover {
	}
	:focus {
		background: ${props => (props.darkMode ? darkInputBackgroundColorFocus : lightInputBackgroundColorFocus)};
	}
	::placeholder {
		/* Firefox, Chrome, Opera */
		color: ${props => (props.darkMode ? darkInputPlaceholderColor : lightInputPlaceholderColor)};
	}
`

export default Input
