/* eslint-disable default-case */
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { buttons } from '../../styles/Colors';
import { borderRadius, margin, padding, borderWidth } from '../../styles/Dimens';
import Text from './Text';
import { lightInputTextColor, lightBorderColor, lightCardBackground } from '../../styles/LightModeColors';
import { darkInputTextColor, darkBorderColor, darkCardBackground } from '../../styles/DarkModeColors';
import { useSpring, animated } from 'react-spring';

const Toggle = (props) => {
    const { checked, onClick, text, darkMode, position } = props

    const toggleAnimation = useSpring({
        width: 20,
        height: 20,
        borderRadius,
        backgroundColor: checked ? buttons.confirm.backgroundColor : buttons.default.disabledBackgroundColor,
        transform: checked ? 'translate3d(20px, 0, 0)' : 'translate3d(0px, 0, 0)'
    })

    return (
        <ToggleFrame position={position} darkMode={darkMode} onClick={() => onClick()}>
            <ToggleText darkMode={darkMode}>{text}</ToggleText>
            <ToggleOutline>
                <animated.div style={toggleAnimation} />
            </ToggleOutline>
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
    padding: ${padding}px;
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

const ToggleOutline = styled.div`
    display: flex;
    border: ${borderWidth} solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    width: 40px;
    border-radius: ${borderRadius}px;
    margin: ${margin}px 0px;
    padding: 1px;
    background-color: ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    transition: all 500ms ease;
`

export default Toggle