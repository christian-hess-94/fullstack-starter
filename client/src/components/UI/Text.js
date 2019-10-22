import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { textFontSize, margin, paddingVertical, paddingHorizontal, titleFontSize } from '../../styles/Dimens'
import { darkInputTextColor } from '../../styles/DarkModeColors'
import { lightInputTextColor } from '../../styles/LightModeColors'
import { ThemeContext } from '../../App'

const Text = props => {
    const { darkMode } = useContext(ThemeContext)
    return <TextStyle {...props} darkMode={darkMode} />
}

Text.propTypes = {
    darkMode: PropTypes.bool,
    isTitle: PropTypes.bool
}

const TextStyle = styled.p`
    font-size: ${props => props.isTitle ? titleFontSize : textFontSize}px;
    padding: ${props => props.isTitle ? `${paddingVertical}px ${paddingHorizontal}px` : `${paddingVertical}px`};
    margin: ${props => props.centered ? `${margin}px auto` : `${margin}px`};
    color: ${ props => props.darkMode ? darkInputTextColor : lightInputTextColor};
    width: ${ props => props.block ? '' : 'fit-content'};
    font-weight: ${props => props.bold ? 'bold' : ''};
`

export default Text