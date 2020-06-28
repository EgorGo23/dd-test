import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

const FilterPanel = styled.form`
    display: flex;
    align-items: center;
    position: relative;
    font-size: 25px;
    margin: 50px 0;

    select {
        border: none;
        outline: none;
        height: 30px;
        width: 175px;
        border-radius: 5px;
        margin-right: 20px;

        option {
            font-size: 15px;


        }

        &:focus {
            border: none;
            outline: none;
        }
    }

    input {
        border: none;
        outline: none;
        height: 30px;
        width: 175px;
        border-bottom: 2px solid #DADADA;
        margin-right: 20px;

        &:focus {
            border: none;
            outline: none;
            border-bottom: 2px solid #00A4F7;
        }
    }

    button {
        border: none;
        outline: none;
        padding: 10px;
        width: 75px;
        background: #00A4F7;
        color: #fff;
        border-radius: 5px; 
        font-weight: 600;
        cursor: pointer;

        &:disabled {
            opacity: 0.25;
        }

        &:hover {
            &:disabled {
                background: #00A4F7;
            }

            background: #128ACE;
        }
    }
`;

const Filter = (props) => {
    const [state, setState] = useState({
        inputValue: '7',
        selectValue: 'days',
    });
    
    const handleChange = ({target}) => {
        if (target.tagName === 'SELECT') {
            setState({
                ...state,
                selectValue: target.value,
            })
        }
        
        if (target.tagName === 'INPUT') {
            setState({
                ...state,
                inputValue: target.value,
            })
        }
    }

    return (
        <FilterPanel onSubmit={(e) => {
                props.filterFunc(e, state);
                setState({
                    inputValue: '7',
                    selectValue: 'days',
                })
            }}
        >
            <select value={state.selectValue} onChange={(e) => handleChange(e)}>
                <option value='name'>Name</option>
                <option value='date'>First Flight Date</option>
                <option value='days'>Days In Space</option>
                <option value='mission'>Mission Name</option>
                <option value='isMultiple'>Multiple</option>
            </select>
            <input type='text' placeholder='by field' value={state.inputValue} onChange={(e) => handleChange(e)} />
            <button type='submit' disabled={!props.isList || state.inputValue.length === 0}>Filter</button>
        </FilterPanel>
    )
}




export default Filter;