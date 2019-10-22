import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { darkBorderColor, darkCardBackground, darkBackground, darkBoxShadow } from '../../styles/DarkModeColors'
import { lightBorderColor, lightCardBackground, lightBackground, lightBoxShadow } from '../../styles/LightModeColors'
import { borderWidth, borderRadius, padding, margin } from '../../styles/Dimens'
import { ThemeContext } from '../../App'


const Card = props => {
    const { darkMode } = useContext(ThemeContext)
    return <CardStyle darkMode={darkMode} {...props} />
}

Card.propTypes = {

}


const CardStyle = styled.div`
    background-color: ${props => props.darkMode ? darkCardBackground : lightCardBackground};
    border: ${borderWidth}px solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    border-radius: ${borderRadius}px;
    padding: ${padding}px;
    margin: ${margin}px 0px;
    box-shadow: 1px 1px 6px ${props => props.darkMode ? darkBoxShadow : lightBoxShadow};
    :hover{
        box-shadow: ${props => props.canHover ? `2px 2px 10px ${props.darkMode ? darkBoxShadow : lightBoxShadow}` : ''};
        cursor: ${props => props.canClick ? 'pointer' : ''};
        z-index: 10;
        transform: ${props => props.canHover ? 'scale(1.01)' : 'scale(1)'};
    }
    transition: all 500ms ease;
`


export default Card