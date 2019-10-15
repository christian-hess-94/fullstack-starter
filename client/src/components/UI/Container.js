import styled from 'styled-components'
import { borderRadius, borderWidth, padding, textFontSize } from '../../styles/Dimens'
import { lightBackground } from '../../styles/LightModeColors'
import { darkBackground } from '../../styles/DarkModeColors'

const Container = styled.div`
    background: ${props => props.darkMode ? darkBackground : lightBackground};
    padding: ${padding}px;
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;
    overflow: scroll;
`
export default Container