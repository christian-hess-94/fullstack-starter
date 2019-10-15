import React from 'react';

import styled from 'styled-components';
import { colorPrimary, colorAccent } from '../../styles/Colors';
import Text from './Text'
import { borderRadius, padding } from '../../styles/Dimens';
import { lightBackground, lightCardBackground } from '../../styles/LightModeColors';

const Toggle = props => {
    const { checked } = props
    return <div style={{ borderWidth: 1, borderColor: '#000', borderStyle: 'solid' }}>
        <ToggleComponent />
        <p>Text</p>
    </div>
}

const ToggleComponent = styled.div`
    align-self: center;
    border: 1px solid black;
    width: 20px;
    height: 20px;
    border-radius: ${borderRadius}px;
    background-color: ${props => props.checked ? colorPrimary : 'transparent'};
`
export default Toggle