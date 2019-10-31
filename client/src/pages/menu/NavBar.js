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
import MenuIcon from './MenuIcon'
import PageTitle from './PageTitle'
import { shadow } from '../../styles/Colors'

const NavBar = props => {
    const { darkMode } = useContext(ThemeContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    const menuSpring = useSpring({
        opacity: 0.95,
        top: 50,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '80%',
        position: 'fixed',
        padding,
        background: darkMode ? darkCardBackground : lightCardBackground,
        transform: isMenuOpen ? 'translate3d(-3%,0,0) ' : 'translate3d(100%,0,0) ',
        borderTopLeftRadius: isMenuOpen ? borderRadius : 0,
        borderBottomLeftRadius: isMenuOpen ? borderRadius : 0,
    })
    return (
        <NavBarStyle darkMode={darkMode} {...props} >
            <PageTitle title='Superntendência de Obras Públicas' subtitle='Faça login' hasMenu />
            <MenuIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Menu style={menuSpring}>
                {MenuItems.map((item) => (
                    <div key={item.title}>
                        <h1>{item.title}</h1>
                    </div>
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
    flex: 1;
    @media (max-width: 500px) {
        bottom: 0;
    }
    transition: all 500ms ease;
`

export default NavBar