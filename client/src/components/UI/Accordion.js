import React from 'react'
import styled from 'styled-components';
import useMeasure from './../hooks/useMeasure'
import PropTypes from 'prop-types'
import { animated, useSpring } from 'react-spring'
import { padding, margin, borderWidth, borderRadius, paddingVertical, textFontSize, paddingHorizontal } from './../../styles/Dimens'
import { lightBorderColor, lightCardBackground } from './../../styles/LightModeColors'
import { darkBorderColor, darkTextColor, darkCardBackground } from './../../styles/DarkModeColors'
import Button from './Button';
import { buttons } from '../../styles/Colors';



const Accordion = ({ darkMode, children, on, toggle, buttonTitle, centered, block, disabled }) => {
    const [bind, { height, top }] = useMeasure()
    const accordionAnimation = useSpring({
        overflow: 'hidden',
        height: on ? height + top * 2 : 0,
        opacity: on ? 1 : 0,
    })
    return (
        <AccordionFrame darkMode={darkMode} centered={centered} block={block}>
            <Button disabled={disabled} block type='warning' onClick={() => {
                console.log('Clicou: ', on)
                toggle(!on)
            }}>
                {buttonTitle}
            </Button>
            <animated.div style={accordionAnimation}>
                <AccordionBody {...bind}>
                    {children}
                </AccordionBody>
            </animated.div>
        </AccordionFrame>
    )
}

Accordion.propTypes = {
    darkMode: PropTypes.bool,
    centered: PropTypes.bool,
    block: PropTypes.bool,
    children: PropTypes.any,
    on: PropTypes.bool,
    toggle: PropTypes.func,
    buttonTitle: PropTypes.string,
    disabled: PropTypes.bool
}


const AccordionFrame = styled.div`
    border: ${borderWidth}px solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    padding-left: ${padding}px;
    padding-right: ${padding}px;
    border-radius: ${borderRadius}px;
    background-color: ${props => props.darkMode ? darkCardBackground : lightCardBackground};
    margin: auto;
    transition: all 500ms ease;
	width: ${props => (props.block ? props.centered ? '' : `100%` : props.centered ? 'fit-content' : '')};
`;
const AccordionBody = styled.div`
    padding-bottom: 20px;
    overflow: hidden;
`;


export default Accordion
