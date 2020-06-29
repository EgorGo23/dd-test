import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import areFilled from '../utils/areFilled';
import byField from '../utils/byField';
import defaultData from '../defaultData';
import Filter from './Filter';
import Recovery from './Recovery';

const TableContainer = styled.table`
    font-family: 'Montserrat';
    margin: 0 auto;
    border-collapse: collapse;

    th, td {
        padding: 10px;
        text-align: center;
    }

    .without-border {
        border: none;
    }

    button {
        font-family: 'Montserrat';
        font-weight: 600;
        font-size: 15px;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.4s;
        border-radius: 5px;
    }
`;

const Thead = styled.thead`
    font-size: 20px;

    & th {
        border-bottom: 2px solid #00A4F7;
    }
`;

const Tbody = styled.tbody`
    font-size: 15px;

    & > tr > td {
        border-bottom: 2px solid #DADADA;

        & input {
            height: 30px;
            font-size: 15px;

            &::placeholder {
                font-size: 15px;
            }
        }
    }
`;

const AddItem = styled.button`
    background: #00A4F7;
    color: #fff;
    padding: 5px;
    border-radius: 5px; 
    
    &:disabled {
        opacity: 0.25;
    }

    &:hover {
        &:disabled {
            background: #00A4F7;
        }

        background: #128ACE;
    }
`;

const Remove = styled.button`
    background: ${props => props.type === 'remove_item' ? '#dc3545' : '#fff'};
    box-shadow: 0px 0 2px 1px #dc3545;
    color: ${props => props.type === 'remove_item' ? '#fff' : '#dc3545'};
    opacity: ${props => props.type === 'remove_item' ? 0.1 : 1};
    padding: 10px 5px;

    &:hover {
        opacity: 1;
        background: #dc3545;
        border: none;
        color: #fff;
    }
`;

const NewElementFileds = styled.tr`
    border: none;
    
    & > td > input {
        border: none;
        border-bottom: 2px solid #DADADA;

        &:focus {
            border: none;
            outline: none;
            border-bottom: 2px solid #00A4F7;
        }
    }


    & > td {
        border-bottom: none;
        padding: 6px 6px;

        & > input[type="checkbox"] {
            width: 20px;
            height: 20px;
            border: none;
            outline: none;
            margin: 0;
            position: relative;
            top: 3px;
            margin-right: 10px;
        }

        & > label {
            position: relative;
            top: -3px;
        }

        &:nth-child(1) {
            button {
                width: 100px;
            }
        }

        &:nth-child(5) {
            width: 10%;
        }

        &:nth-child(7) {
            button {
                width: 85px;
            }
        }
    }
`;

const Hint = styled.p`
    font-size: 20px;
    border: 2px solid #DADADA;
    border-radius: 5px;
    border-radius: 5px;
    padding: 10px;
`;

const Table = (props) => {
    const [astronautList, setAstronautList] = useState(props.data);
    const [newElementFields, setNewElementFields] = useState({
        name: '',
        date: '',
        days: '',
        mission: '',
        isMultiple: false,
    });
    const [isHint, setIsHint] = useState(true);

    useEffect(() => {
        const timerId = setTimeout(() => setIsHint(false), 4000);
    }, [])

    useEffect(() => {
        const sendDataToServer = async () => {
            try {
                const response = await fetch('/api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(astronautList),
                })
            } catch (e) {
                console.log(e);
            }
        }
        
        sendDataToServer();
    }, [astronautList])
    
    const removeItem = async (id) => {
        setAstronautList(astronautList.filter((element) => element.id !== id));        
    }
    
    const addNewItem = async () => {
        const ind = astronautList.findIndex((element) => element.name.toLowerCase() === newElementFields.name.toLowerCase().trim())
        if (ind !== -1) {
            const astronaut = astronautList[ind];
        
            astronaut.days = +astronaut.days + +newElementFields.days + '';
            astronaut.mission = `${astronaut.mission} / ${newElementFields.mission}`;
            astronaut.isMultiple = newElementFields.isMultiple;

            const newAstronautList = astronautList.slice(); 
            newAstronautList.splice(ind, 1, astronaut);
            setAstronautList(newAstronautList);
        } else {
            const newAstronautList = astronautList.slice();
            newElementFields.id = uuidv4();
            newAstronautList.push(newElementFields);
            setAstronautList(newAstronautList);
        }

        setNewElementFields({
            name: '',
            date: '',
            days: '',
            mission: '',
            isMultiple: false,
        });        
    }

    const filterList = (e, state) => {
        e.preventDefault();
        const { inputValue, selectValue } = state;
        
        if (selectValue === 'mission') {
            const filteredArr = astronautList.slice().filter((elm) => elm.mission.split(' / ').includes(inputValue));
            
            if (filteredArr.length !== 0) {
                setAstronautList(filteredArr);
            }
        } else {
            const filteredArr = astronautList.slice().filter((elm) => String(elm[selectValue]) === String(inputValue));
            
            if (filteredArr.length !== 0) {
                setAstronautList(filteredArr);
            }
        }
    }   
    
    const recoverData = () => {
        setAstronautList(defaultData);
    }

    return (
        <>
            {
                isHint && (
                    <Hint>Сlick on column name to sort</Hint>
                )
            }
            <Recovery recoveryFunc={recoverData} />
            <Filter isList={astronautList.length !== 0} filterFunc={filterList} />
            <TableContainer>
                <Thead>
                    <tr>
                        <th className="without-border"></th>
                        <th 
                            onClick={() => setAstronautList(astronautList.slice().sort(byField('name', 'string')))}
                        >
                            Name
                        </th>
                        <th
                            onClick={() => setAstronautList(astronautList.slice().sort(byField('date', 'number')))}
                        >
                            First Flight Date
                        </th>
                        <th
                            onClick={() => setAstronautList(astronautList.slice().sort(byField('days', 'number')))}
                        >
                            Days In Space
                        </th>
                        <th
                            onClick={() => setAstronautList(astronautList.slice().sort(byField('mission', 'string')))}
                        >
                            Mission name
                        </th>
                        <th
                            onClick={() => setAstronautList(astronautList.slice().sort(byField('isMultiple', 'string')))}
                        >
                            Multiple
                        </th>
                        <th className="without-border"></th>           
                    </tr>
                </Thead>
                <Tbody>
                    {
                        astronautList.map(({name, date, days, mission, isMultiple, id}) => {
                            return (
                                <tr key={id}>
                                    <td className="without-border"></td>
                                    <td>{name}</td>
                                    <td>{date}</td>
                                    <td>{days}</td>
                                    <td>{mission}</td>
                                    <td>{String(isMultiple)}</td>
                                    <td className="without-border">
                                        <Remove type="remove_item" onClick={() => removeItem(id)}>Remove</Remove>
                                    </td>
                                </tr>  
                            );
                        })
                    }
                    <NewElementFileds>
                        <td className="without-border">
                            <AddItem
                                onClick={() => addNewItem()}
                                disabled={areFilled(newElementFields)}
                            >
                                Add astronaut
                            </AddItem>
                        </td>
                        <td className="without-border">
                            <input 
                                type="text" 
                                name="name" 
                                value={newElementFields.name} 
                                placeholder="name" 
                                onChange={(e) => setNewElementFields({
                                    ...newElementFields,
                                    name: e.target.value,
                                })}
                            />
                        </td>
                        <td className="without-border"> 
                            <input 
                                type="number" 
                                name="date" 
                                value={newElementFields.date} 
                                placeholder="date" 
                                onChange={(e) => setNewElementFields({
                                        ...newElementFields,
                                        date: Number(e.target.value.trim()),
                                })}
                            />
                        </td>
                        <td className="without-border">
                            <input 
                                type="number" 
                                name="days" 
                                value={newElementFields.days} 
                                placeholder="days" 
                                onChange={(e) => setNewElementFields({
                                    ...newElementFields,
                                    days: Number(e.target.value.trim()),
                                })}
                            />
                        </td>
                        <td className="without-border">
                            <input 
                                type="text" 
                                name="mission" 
                                value={newElementFields.mission} 
                                placeholder="mission" 
                                onChange={(e) => setNewElementFields({
                                    ...newElementFields,
                                    mission: e.target.value,
                                })}
                            />
                        </td>
                        <td className="without-border">
                            <input 
                                id="multiple"
                                type="checkbox" 
                                name="multiple" 
                                checked={newElementFields.isMultiple} 
                                placeholder="multiple" 
                                onChange={(e) => setNewElementFields({
                                    ...newElementFields,
                                    isMultiple: !newElementFields.isMultiple,
                                })}
                            />
                            <label htmlFor="multiple">multiple</label>
                        </td>
                        <td className="without-border">
                            <Remove 
                                type="clear_list" 
                                onClick={() => setNewElementFields({
                                    name: '',
                                    date: '',
                                    days: '',
                                    mission: '',
                                    isMultiple: '',
                                })}
                            >
                                Clear
                            </Remove>
                        </td>
                    </NewElementFileds>
                </Tbody>
            </TableContainer>
        </>
    )
}

export default Table;