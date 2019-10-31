import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types'

import Column from './../../components/UI/Column'

import { cearaDarkGreen, cearaLightGreen, shadow } from './../../styles/Colors';

const PageTitle = ({ title, subtitle, hasMenu }) => <header>
    <div style={{
        display: 'flex',
        zIndex: 10
    }}>
        <Column>
            <Title>{title}</Title>
            <Subtitle>{subtitle}</Subtitle>
        </Column>
    </div>
</header>


export const Title = styled.p`
    font-size: 40px;
    font-weight: normal;
    color: ${cearaDarkGreen};
    text-shadow: ${shadow};
    font-weight: 500;
    word-wrap: normal;
    margin-bottom: 0px;
    margin-top: 0px;
`;
export const Subtitle = styled.p`
    font-size: 20px;
    font-weight: normal;
    color: ${cearaLightGreen};
    text-shadow: ${shadow};
    font-weight: 400;
    margin-top: 0px;
`;


PageTitle.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
}

export default PageTitle
