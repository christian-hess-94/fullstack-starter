import React, { useContext, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSpring, animated, useChain, useTransition } from 'react-spring'

import MenuItems from './MenuItems'
import Text from '../../components/UI/Text'


import { lightNavbarBackground, lightBorderColor, lightMenuIconColor, lightCardBackground } from '../../styles/LightModeColors'
import { darkNavbarBackground, darkBorderColor, darkDrawerIconColor, darkCardBackground } from '../../styles/DarkModeColors'
import { ThemeContext } from '../../App'
import { margin, borderRadius, padding } from '../../styles/Dimens'

const NavBar = props => {
    const { darkMode } = useContext(ThemeContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const makeArrowTop = useSpring({
        height: isMenuOpen ? '8px' : '4px',
        backgroundColor: darkMode ? lightMenuIconColor : darkDrawerIconColor,
        margin: '4px',
        borderRadius: borderRadius,
        transform: isMenuOpen ? 'rotate(45deg) scale(0.5) translate3d(20px,2px,0)' : 'rotate(0deg) scale(1) translate3d(0px,0px,0)',
        width: isMenuOpen ? '32px' : '30px'
    })
    const makeArrowMiddle = useSpring({
        height: '4px',
        backgroundColor: darkMode ? lightMenuIconColor : darkDrawerIconColor,
        margin: '4px',
        borderRadius: borderRadius,
        width: isMenuOpen ? `${20}px` : '25px',
        transform: isMenuOpen ? 'translate3d(2px,0,0)' : 'translate3d(0px,0,0)',
    })
    const makeArrowBottom = useSpring({
        height: isMenuOpen ? '8px' : '4px',
        backgroundColor: darkMode ? lightMenuIconColor : darkDrawerIconColor,
        margin: '4px',
        borderRadius: borderRadius,
        transform: isMenuOpen ? 'rotate(-45deg) scale(0.5) translate3d(20px,-2px,0)' : 'rotate(0deg) scale(1) translate3d(0px,0px,0)',
        width: isMenuOpen ? '32px' : '20px'
    })

    // const menuRef = useRef()

    const menuSpring = useSpring({
        // ref: menuRef,
        opacity: 0.95,
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        position: 'fixed',
        padding,
        background: darkMode ? darkCardBackground : lightCardBackground,
        transform: isMenuOpen ? 'translate3d(30%,0,0) ' : 'translate3d(100%,0,0) ',
        borderTopLeftRadius: isMenuOpen ? borderRadius : 0,
        borderBottomLeftRadius: isMenuOpen ? borderRadius : 0,
    })

    // const transitionRef = useRef()
    const itemTransitions = useTransition(MenuItems, item => item.title, {
        // ref: transitionRef,
        trail: 400 / MenuItems.length,
        from: { opacity: 0, transform: 'translate3d(0,30px,0) ', },
        enter: { opacity: 1, transform: 'translate3d(0,0,0) ' },
        leave: { opacity: 0, transform: 'translate3d(0,30px,0) ' },
        config: {
            mass: 3
        }
    })

    // useChain([menuRef, transitionRef])
    return (
        <NavBarStyle darkMode={darkMode} {...props} >
            <NavBarLogo id='navbarLogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWmGCIdAxMiMx407obVe8rBdY_zcexrY9nuxwBqQpH_OGBqk-B' />
            <Text isTitle bold centered>Page Title</Text>
            <NavBarMenuIcon isMenuOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <MenuDash style={makeArrowTop} />
                <MenuDash style={makeArrowMiddle} />
                <MenuDash style={makeArrowBottom} />
            </NavBarMenuIcon>

            {/* {menuTransition.map(({ item, key, props: animation }) => (
                item && <Menu key={key} style={animation} >
                    
                </Menu>
            ))} */}
            <Menu style={menuSpring}>
                <ProfileSection>
                    oi
                </ProfileSection>
                {itemTransitions.map(({ item, key, props: animation }) => (
                    <animated.div key={key} style={animation}>
                        <h1>{item.title}</h1>
                    </animated.div>
                ))}
            </Menu>
        </NavBarStyle>
    )
}

NavBar.propTypes = {
    bottom: PropTypes.bool
}
const Menu = animated.div

const NavBarStyle = styled.nav`
            z-index: 150;
            display: flex;
            position: fixed;
            flex-direction: row;
            justify-content: space-between;
    background-color: ${props => props.darkMode ? darkNavbarBackground : lightNavbarBackground};
            width: 100%;
            flex: 1;
    @media (max-width: 500px) {
                bottom: 0;
        #navbarLogo{
            }
            }
            transition: all 500ms ease;
        `

const NavBarLogo = styled.img`
            height: 40px;
            width: 40px;
            min-width: 40px;
            min-height: 40px;
            align-self: center;
    margin-left: ${margin}px;
            border-radius: 50% ;
            transition: all 500ms ease;
            border: 2px solid green;
            padding: 4px;
        `

const NavBarMenuIcon = styled.div`
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
const ProfileSection = styled.div`
    background-color: green;
    border-radius: ${borderRadius}px;
`

const MenuDash = animated.div


export default NavBar