import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { borderRadius, borderWidth, textFontSize, margin, paddingVertical, paddingHorizontal } from '../../styles/Dimens'
import { lightBorderColor } from '../../styles/LightModeColors'
import { buttons } from '../../styles/Colors'
import { darkBorderColor, darkTextColor } from '../../styles/DarkModeColors'

const Button = (props) => <ButtonStyle {...props} />

const ButtonStyle = styled.button`
	background-color: ${props => buttons[props.type].backgroundColor};
	border-radius: ${borderRadius}px;
	border: ${borderWidth}px solid ${props => props.type === 'default' ? props.darkMode ? darkBorderColor : lightBorderColor : lightBorderColor};
	font-size: ${textFontSize}px;
	padding: ${paddingVertical}px ${paddingHorizontal}px;
	color: ${props => props.type === 'default' ? props.darkMode ? darkTextColor : buttons[props.type].textColor : buttons[props.type].textColor};
	font-weight: bold;
	display: block;
	margin: ${props => props.position === 'full' ? `${margin}px auto` : props.position === 'center' ? `${margin}px auto` : `${margin}px`};
	width: ${props => props.position === 'full' ? props.position === 'center' ? '' : `100%` : props.position === 'center' ? '' : `fit-content`};
	cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
	:disabled{
		color: ${props => buttons[props.type].disabledTextColor};
		background-color: ${props => buttons[props.type].disabledBackgroundColor};
	}
	:hover {
		background-color: ${props => props.disabled ? '' : buttons[props.type].hoverColor};
	}
	transition: all 500ms ease;
`
Button.propTypes = {
	darkMode: PropTypes.bool,
	position: PropTypes.string,
	block: PropTypes.bool,
	centered: PropTypes.bool,
	type: PropTypes.string.isRequired,
}

export default Button
