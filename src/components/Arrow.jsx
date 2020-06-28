import React from 'react';
import styled from 'styled-components';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';

const ArrowContainer = styled.div`
    width: 15px;
    height: 15px;
    cursor: pointer;
    position: absolute;

    ${props => console.log(props)}
`;

const Arrow = ({ direction }) => (
    <ArrowContainer direction={direction}>
      {direction === 'next' ? (<RightArrow />) : (<LeftArrow />)}
    </ArrowContainer>
);

export default Arrow;