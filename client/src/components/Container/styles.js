import styled from 'styled-components'
import { borderRadius, borderWidth, padding, textFontSize } from '../Dimens'
import { lightBackground } from '../LightModeColors'
import { darkBackground } from '../DarkModeColors'

export const ContainerStyleDark = styled.div`
    background: ${darkBackground};
    padding: 20px;
    height: 100%;
    width: 100%;
    flex: 1;
`
export const ContainerStyleLight = styled.div`
    background: ${lightBackground};
    padding: 20px;
    height: 100%;
    width: 100%;
    flex: 1;
    
`