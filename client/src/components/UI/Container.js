import styled from 'styled-components'
import { borderRadius, borderWidth, padding, textFontSize } from '../../styles/Dimens'
import { lightBackground } from '../../styles/LightModeColors'
import { darkBackground } from '../../styles/DarkModeColors'

const Container = styled.div`
    display: flex;
    background: ${props => props.darkMode ? darkBackground : lightBackground};
    padding: ${padding}px;
    transition: all 500ms ease;
    flex-direction: column;
    height: 100%;
    min-height : 100vh;
    width: 100%;
`
export default Container