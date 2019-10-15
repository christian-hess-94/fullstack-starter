import styled from 'styled-components'
import { darkBorderColor, darkCardBackground, darkBackground } from '../../styles/DarkModeColors'
import { lightBorderColor, lightCardBackground } from '../../styles/LightModeColors'
import { borderWidth, borderRadius, padding, margin } from '../../styles/Dimens'


const Card = styled.div`
    background-color: ${props => props.darkMode ? darkCardBackground : lightCardBackground};
    border: ${borderWidth}px solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    border-radius: ${borderRadius}px;
    padding: ${padding}px;
    margin: ${margin}px;
    transition: all 500ms ease;
`


export default Card