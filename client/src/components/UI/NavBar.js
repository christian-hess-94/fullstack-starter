import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lightNavbarBackground, lightBorderColor } from './../../styles/LightModeColors'
import { darkNavbarBackground, darkBorderColor } from './../../styles/DarkModeColors'
import { ThemeContext } from '../../App'
import { navbarHeight, margin, borderRadius, padding } from '../../styles/Dimens'
import Text from './Text'

const NavBar = props => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <NavBarStyle darkMode={darkMode} {...props} >
            <NavBarLogo id='navbarLogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQWmGCIdAxMiMx407obVe8rBdY_zcexrY9nuxwBqQpH_OGBqk-B' />
            <Text isTitle>Page Title</Text>
            <NavBarMenuIcon>
                <div style={{ flex: 1, backgroundColor: 'black', margin: 4, borderRadius }} />
                <div style={{ flex: 1, backgroundColor: 'black', margin: 4, borderRadius }} />
                <div style={{ flex: 1, backgroundColor: 'black', margin: 4, borderRadius }} />
            </NavBarMenuIcon>
        </NavBarStyle>
    )
}

NavBar.propTypes = {
    bottom: PropTypes.bool
}

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
`

const NavBarLogo = styled.img`
    height: 40px;
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    align-self: center;
    margin-left: ${margin}px;
    border-radius: ${borderRadius}px;
`

const NavBarMenuIcon = styled.div`
    height: 40px;
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin-right: ${margin}px;
    border-radius: ${borderRadius}px;
    justify-items: center;
    :hover{
        background-color: ${props => props.darkMode ? darkBorderColor : lightBorderColor}
    }
`


export default NavBar