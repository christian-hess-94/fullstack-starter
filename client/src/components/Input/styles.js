import styled from 'styled-components'
import { borderRadius, borderWidth, padding, textFontSize, margin } from '../Dimens'
import { lightBorderColor, lightInputTextColor, lightInputPlaceholderColor, lightBorderColorHover, lightInputBackgroundColorFocus } from '../LightModeColors'
import { darkBorderColor, darkInputTextColor, darkInputPlaceholderColor, darkBorderColorHover, darkInputBackgroundColorFocus } from '../DarkModeColors'

export const InputStyleDark = styled.input`
    background-color:transparent;
    border-radius: ${borderRadius}px;
    border: ${borderWidth}px solid ${darkBorderColor};
    font-size: ${textFontSize}px;
    color: ${darkInputTextColor};
    flex: 1;
    padding: ${padding}px;
    padding-left: 24px;
    margin: ${margin}px;
    ::placeholder { /* Firefox, Chrome, Opera */ 
        color: ${darkInputPlaceholderColor}; 
    }
    :hover{
    }
    :focus{
        background: ${darkInputBackgroundColorFocus}
    }
`
export const InputStyleLight = styled.input`
    background-color:transparent;
    border-radius: ${borderRadius}px;
    border: ${borderWidth}px solid ${lightBorderColor};
    font-size: ${textFontSize}px;
    color: ${lightInputTextColor};
    flex: 1;
    padding: ${padding}px;
    padding-left: 24px;
    margin: ${margin}px;
    ::placeholder { /* Firefox, Chrome, Opera */ 
        color: ${lightInputPlaceholderColor}; 
    }
    :hover{
    }
    :focus{
        background: ${lightInputBackgroundColorFocus}        
    }
`