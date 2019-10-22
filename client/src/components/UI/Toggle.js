/* eslint-disable default-case */
import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { buttons } from '../../styles/Colors';
import { borderRadius, margin, padding, borderWidth } from '../../styles/Dimens';
import { lightInputTextColor, lightBorderColor, lightCardBackground, lightInputPlaceholderColor } from '../../styles/LightModeColors';
import { darkInputTextColor, darkBorderColor, darkCardBackground, darkInputPlaceholderColor } from '../../styles/DarkModeColors';
import { useSpring, animated } from 'react-spring';
import { ThemeContext } from '../../App';

const Toggle = (props) => {
    const { checked, onClick, text, position } = props

    const toggleAnimation = useSpring({
        width: 15,
        height: 10,
        borderRadius: borderRadius,
        backgroundColor: checked ? buttons.confirm.backgroundColor : buttons.default.disabledBackgroundColor,
        transform: checked ? 'translate3d(25px, 0, 0)' : 'translate3d(0px, 0, 0)'
    })

    const { darkMode } = useContext(ThemeContext)

    return (
        <ToggleFrame position={position} darkMode={darkMode} onClick={() => onClick()}>
            <ToggleText darkMode={darkMode}>{text}</ToggleText>
            <ToggleSliderBackground darkMode={darkMode}>
                <ToggleSlider style={toggleAnimation} />
            </ToggleSliderBackground>
        </ToggleFrame>
    )
}

Toggle.propTypes = {
    checked: PropTypes.bool,
    onClick: PropTypes.func,
    text: PropTypes.string,
    darkMode: PropTypes.bool,
    position: PropTypes.string
}

const ToggleFrame = styled.div`
    display: flex;
    padding: ${padding / 2}px;
    border: ${borderWidth}px solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    width: fit-content ;
    align-self: ${props => props.position === 'center' ? 'center' : props.position === 'start' ? 'flex-start' : props.position === 'end' ? 'flex-end' : ''};
    border-radius: ${borderRadius}px;
    margin: ${margin}px 0px;
    flex-direction: row;
    cursor: pointer;
        :hover {
        background-color: ${props => props.darkMode ? darkCardBackground : lightCardBackground};
    }
    transition: all 500ms ease;
`
const ToggleText = styled.span`
    align-self: center;
    color: ${props => props.darkMode ? darkInputTextColor : lightInputTextColor};
    margin-right: ${margin}px;
    font-weight: bold;
`

const ToggleSliderBackground = styled.div`
    border: ${borderWidth} solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    width: 40px;
    border-radius: ${borderRadius}px;
    margin: ${margin}px 0px;
    padding: 2px;
    background-color: ${props => props.darkMode ? lightInputPlaceholderColor : darkInputPlaceholderColor};
    transition: all 500ms ease;
`

const ToggleSlider = animated.div


export default Toggle