import styled from 'styled-components'
import PropTypes from 'prop-types'
import { borderRadius, borderWidth, textFontSize, margin, paddingVertical, paddingHorizontal } from '../../styles/Dimens'
import { lightBorderColor } from '../../styles/LightModeColors'
import { buttons } from '../../styles/Colors'
import { darkBorderColor, darkTextColor } from '../../styles/DarkModeColors'

const Button = styled.button`
	background-color: ${props => buttons[props.type].backgroundColor};
	border-radius: ${borderRadius}px;
	border: ${borderWidth}px solid ${props => props.type === 'default' ? props.darkMode ? darkBorderColor : lightBorderColor : lightBorderColor};
	font-size: ${textFontSize}px;
	
	padding: ${paddingVertical}px ${paddingHorizontal}px;
	color: ${props => props.type === 'default' ? props.darkMode ? darkTextColor : buttons[props.type].textColor : buttons[props.type].textColor};
	font-weight: bold;
	display: block;
	margin: ${props => (props.block ? `${margin}px auto` : `${margin}px`)};
	width: ${props => (props.block ? `100%` : `fit-content`)};
	
    transition: all 500ms ease;
	cursor: pointer;
	:hover {
		background-color: ${props => buttons[props.type].hoverColor};
	}
`
Button.propTypes = {
	darkMode: PropTypes.bool,
	block: PropTypes.bool,
	type: PropTypes.string.isRequired,
}

export default Button
