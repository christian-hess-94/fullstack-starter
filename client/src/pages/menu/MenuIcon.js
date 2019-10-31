import React, { useContext } from 'react'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import PropTypes from 'prop-types'
import { lightMenuIconColor, lightBorderColor } from '../../styles/LightModeColors'
import { darkDrawerIconColor, darkBorderColor } from '../../styles/DarkModeColors'
import { borderRadius, margin } from '../../styles/Dimens'
import { ThemeContext } from '../../App'
import { shadow } from '../../styles/Colors'

const MenuIcon = ({ isMenuOpen, setIsMenuOpen }) => {

    const { darkMode } = useContext(ThemeContext)
    const makeArrowTop = useSpring({
        height: isMenuOpen ? '8px' : '4px',
        backgroundColor: darkMode ? lightMenuIconColor : darkDrawerIconColor,
        margin: '4px',
        borderRadius: borderRadius,
        transform: isMenuOpen ? 'rotate(45deg) scale(0.5) translate3d(20px,2px,0)' : 'rotate(0deg) scale(1) translate3d(0px,0px,0)',
        width: isMenuOpen ? '32px' : '30px',
        boxShadow: shadow
    })
    const makeArrowMiddle = useSpring({
        height: '4px',
        backgroundColor: darkMode ? lightMenuIconColor : darkDrawerIconColor,
        margin: '4px',
        borderRadius: borderRadius,
        width: isMenuOpen ? `${20}px` : '25px',
        transform: isMenuOpen ? 'translate3d(2px,0,0)' : 'translate3d(0px,0,0)',
        boxShadow: shadow
    })
    const makeArrowBottom = useSpring({
        height: isMenuOpen ? '8px' : '4px',
        backgroundColor: darkMode ? lightMenuIconColor : darkDrawerIconColor,
        margin: '4px',
        borderRadius: borderRadius,
        transform: isMenuOpen ? 'rotate(-45deg) scale(0.5) translate3d(20px,-2px,0)' : 'rotate(0deg) scale(1) translate3d(0px,0px,0)',
        width: isMenuOpen ? '32px' : '20px',
        boxShadow: shadow
    })
    return (
        <MenuIconStyle isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <MenuDash style={makeArrowTop} />
            <MenuDash style={makeArrowMiddle} />
            <MenuDash style={makeArrowBottom} />
        </MenuIconStyle>
    )
}


const MenuIconStyle = styled.div`
    z-index: 100;
    height: 40px;
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-right: ${margin}px;
    border-radius: ${borderRadius / 4}px;
    justify-items: flex-end;
    @media (min-width: 500px) {
        :hover{
                background-color: ${props => props.darkMode ? darkBorderColor : props.isMenuOpen ? '' : lightBorderColor}
            }
        }
        transition: all 500ms ease;
    `

const MenuDash = animated.div
MenuIcon.propTypes = {

}

export default MenuIcon
