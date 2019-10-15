import styled from 'styled-components'
import PropTypes from 'prop-types'
import { textFontSize, margin, paddingVertical, paddingHorizontal, titleFontSize } from '../../styles/Dimens'
import { darkInputTextColor } from '../../styles/DarkModeColors'
import { lightInputTextColor } from '../../styles/LightModeColors'

const Text = styled.p`
    font-size: ${props => props.isTitle ? titleFontSize : textFontSize}px;
    padding: ${props => props.isTitle ? `${paddingVertical}px ${paddingHorizontal}px` : `${paddingVertical}px`};
    margin: ${margin}px;
    color: ${ props => props.darkMode ? darkInputTextColor : lightInputTextColor};
    width: ${ props => props.block ? '' : 'fit-content'};
    font-weight: ${props => props.bold ? 'bold' : ''};
`
Text.propTypes = {
    darkMode: PropTypes.bool,
    isTitle: PropTypes.bool
}

export default Text