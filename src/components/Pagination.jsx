import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Arrow from './Arrow';

const PaginationContainer = styled.div`
    font-family: 'Montserrat';
    font-size: 15px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 70px;
    position: relative;
    margin-top: 20px;

    div[direction="prev"] {
        left: 10px;
    }

    div[direction="next"] {
        right: 10px;
    }
`;

const PaginationBlock = styled.span`

`;

const PaginationElement = styled.span`
    font-size: 20px;
`;  

const Pagination = ({ numOfElements }) => {

    return (
        <PaginationContainer>
            <PaginationBlock>
                <PaginationElement>
                    1
                </PaginationElement>
            </PaginationBlock>
            {
                <>
                    <Arrow direction="prev" />
                    <Arrow direction="next" />
                </>
            }
        </PaginationContainer>
    )
}

export default Pagination;