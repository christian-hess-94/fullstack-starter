import styled from 'styled-components'
import PropTypes from 'prop-types'
import { borderRadius, borderWidth, padding, textFontSize, margin, paddingHorizontal, paddingVertical } from '../../styles/Dimens'
import { lightBorderColor, lightInputTextColor, lightInputPlaceholderColor, lightInputBackgroundColorFocus } from '../../styles/LightModeColors'
import { darkBorderColor, darkInputTextColor, darkInputPlaceholderColor, darkInputBackgroundColorFocus } from '../../styles/DarkModeColors'

const Input = styled.input`
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
Input.propTypes = {
	darkMode: PropTypes.bool,
	block: PropTypes.bool,
}

export default Input
