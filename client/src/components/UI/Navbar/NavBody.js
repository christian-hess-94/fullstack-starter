import styled from 'styled-components'
import { lightNavbarBackground } from '../../../styles/LightModeColors'
import { darkNavbarBackground } from '../../../styles/DarkModeColors'


const NavBody = styled.nav`
    background-color: ${props => props.darkMode ? darkNavbarBackground : lightNavbarBackground};
`


export default NavBody