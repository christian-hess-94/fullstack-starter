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
import Text from './Text';



const Accordion = ({ darkMode, children, on, toggle, buttonTitle, centered, block, disabled, type }) => {
    const [bind, { height, top }] = useMeasure()
    const accordionAnimation = useSpring({
        overflow: 'hidden',
        height: on ? height + top * 2 : 0,
        opacity: on ? 1 : 0,
    })
    const imageFlip = useSpring({
        transform: on ? 'rotate(180deg)' : 'rotate(0deg)',
        margin: '0px auto',
        flex: 1,
        display: 'flex'
    })
    return (
        <AccordionFrame darkMode={darkMode} centered={centered} block={block}>
            <AccordionHeader disabled={disabled} type={type} onClick={() => toggle(!on)}>
                <AccordionButton disabled={disabled} position='full' type={type} >
                    {buttonTitle}
                </AccordionButton>
                <animated.img style={imageFlip} src={require('./../../images/components/arrow_down.png')} />
            </AccordionHeader>

            <animated.div style={accordionAnimation}>
                <AccordionBody {...bind}>
                    {children}
                </AccordionBody>
            </animated.div>

        </AccordionFrame >
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

const AccordionHeader = styled.div`
    display: flex;
    border: ${borderWidth}px solid ${props => props.type === 'default' ? props.darkMode ? darkBorderColor : lightBorderColor : lightBorderColor};
    flex-direction: row;
    background-color: ${props => buttons[props.type].backgroundColor};
	border-radius: ${borderRadius}px;
	:hover {
		background-color: ${props => props.disabled ? '' : buttons[props.type].hoverColor};
    }
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
	transition: all 500ms ease;
`

const AccordionButton = styled.button`
    background-color: transparent;
    font-size: ${textFontSize}px;
    border: 0px;
	
	padding: ${paddingVertical}px ${paddingHorizontal}px;
	color: ${props => props.type === 'default' ? props.darkMode ? darkTextColor : buttons[props.type].textColor : buttons[props.type].textColor};
	font-weight: bold;
    display: flex;
	width: ${props => props.position === 'full' ? props.position === 'center' ? '' : `100%` : props.position === 'center' ? '' : `fit-content`};
	
	:disabled{
		color: ${props => buttons[props.type].disabledTextColor};
		background-color: ${props => buttons[props.type].disabledBackgroundColor};
    }
    pointer-events: none;
	transition: all 500ms ease;
`;

const AccordionFrame = styled.div`
    border: ${borderWidth}px solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    border-radius: ${borderRadius + 2}px;
    background-color: ${props => props.darkMode ? darkCardBackground : lightCardBackground};
    margin: ${props => props.centered ? '0px auto' : ''};
    transition: all 500ms ease;
	width: ${props => props.block ? props.centered ? '' : `100%` : props.centered ? 'fit-content' : ''};
`;
const AccordionBody = styled.div`
    padding: ${padding}px;
    overflow: hidden;
`;


export default Accordion
