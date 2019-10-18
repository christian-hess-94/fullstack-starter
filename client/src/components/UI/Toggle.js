import React from 'react'
import styled from 'styled-components'
import Checkbox from 'react-simple-checkbox';
import { buttons } from '../../styles/Colors';
import { borderRadius, margin } from '../../styles/Dimens';
import Text from './Text';
import { lightInputTextColor } from '../../styles/LightModeColors';
import { darkInputTextColor } from '../../styles/DarkModeColors';
function Toggle(props) {
    const { checked, onChange, text, darkMode } = props
    return (
        <CheckboxFrame>
            <CheckboxContent>
                <CheckboxText darkMode={darkMode}>{text}</CheckboxText>
                <Checkbox
                    color={buttons.confirm.backgroundColor}
                    size={3}
                    checked={checked}
                    onChange={onChange} />
            </CheckboxContent>
        </CheckboxFrame>
    )
}

const CheckboxFrame = styled.div`
display: flex;
flex: 1;
padding: 8px;
flex-direction: column;
width: fit-content;
`
const CheckboxContent = styled.div`
flex: 1;
flex-direction: row;
`
const CheckboxText = styled.span`
color: ${props => props.darkMode ? darkInputTextColor : lightInputTextColor};
margin-right: ${margin}px
`
export default Toggle