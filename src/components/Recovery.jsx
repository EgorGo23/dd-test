import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const RecoveryBlockContainer = styled.div`
    font-family: 'Montserrat';
    font-size: 15px;
    display: flex;
    align-items: center;
    border: 2px solid #DADADA;
    border-radius: 5px;
    padding: 5px 10px;
`;

const RecoveryButton = styled.button`
    padding: 10px;
    font-weight: 600;
    border: none;
    outline: none;
    width: 90px;
    background: #00A4F7;
    color: #fff;
    border-radius: 5px; 
    cursor: pointer;
    margin-right: 15px;

    &:hover {
        background: #128ACE;
    }
`;

const Recovery = (props) => {
    return (
        <RecoveryBlockContainer>
            <RecoveryButton onClick={props.recoveryFunc}>Recovery</RecoveryButton>
            <p>
                If the table is empty, then click on the button to restore data
            </p>
        </RecoveryBlockContainer>
    )
}

export default Recovery;