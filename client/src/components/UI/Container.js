import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { borderRadius, borderWidth, padding, textFontSize, navbarHeight, titleFontSize, margin } from '../../styles/Dimens'
import { lightBackground } from '../../styles/LightModeColors'
import { darkBackground } from '../../styles/DarkModeColors'

import { ThemeContext } from '../../App'

const Container = props => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <ContainerStyle darkMode={darkMode} {...props} />
    )
}

Container.propTypes = {

}

const ContainerStyle = styled.div`
    display: flex;
    background: ${props => props.darkMode ? darkBackground : lightBackground};
    padding: ${padding}px ;
    padding-top: ${padding * 2 + margin * 2 + titleFontSize}px;
    transition: all 500ms ease;
    flex-direction: column;
    height: 100%;
    min-height : 100vh;
    width: 100%;

    @media (max-width: 500px) {
        padding-top: 0px;
        padding-bottom: ${padding * 2 + margin * 2 + titleFontSize}px;
    }
`
export default Container