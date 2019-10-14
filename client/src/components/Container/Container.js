import React from 'react';

import { ContainerStyleDark, ContainerStyleLight } from './styles';

export default function Container(props) {
    return props.darkMode ?
        <ContainerStyleDark>
            {props.children}
        </ContainerStyleDark>
        :
        <ContainerStyleLight>
            {props.children}
        </ContainerStyleLight>
}
