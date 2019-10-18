import styled from 'styled-components'
import { darkBorderColor, darkCardBackground, darkBackground, darkBoxShadow } from '../../styles/DarkModeColors'
import { lightBorderColor, lightCardBackground, lightBackground, lightBoxShadow } from '../../styles/LightModeColors'
import { borderWidth, borderRadius, padding, margin } from '../../styles/Dimens'


const Card = styled.div`
    background-color: ${props => props.darkMode ? darkCardBackground : lightCardBackground};
    border: ${borderWidth}px solid ${props => props.darkMode ? darkBorderColor : lightBorderColor};
    border-radius: ${borderRadius}px;
    padding: ${padding}px;
    margin: ${margin}px;
    transition: all 500ms ease;
    box-shadow: 1px 1px 6px ${props => props.darkMode ? darkBoxShadow : lightBoxShadow};
    :hover{
        box-shadow: ${props => props.canHover ? `2px 2px 10px ${props.darkMode ? darkBoxShadow : lightBoxShadow}` : '2px 2px'};
        cursor: ${props => props.canHover ? 'pointer' : ''};
        z-index: 10;
        transform: scale(1.02)
    }
`


export default Card