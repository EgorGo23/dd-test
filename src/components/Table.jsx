import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import areFilled from '../utils/areFilled';
import byField from '../utils/byField';

const TableContainer = styled.table`
    font-family: 'Montserrat';
    width: 70%;
    margin: 0 auto;
    border-collapse: collapse;

    th, td {
        padding: 20px;
        text-align: center;
    }

    .without-border {
        border: none;
    }

    button {
        font-family: 'Montserrat';
        font-weight: 600;
        font-size: 20px;
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.4s;
    }
`;

const Thead = styled.thead`
    font-size: 30px;

    & th {
        border-bottom: 5px solid #00A4F7;
    }
`;

const Tbody = styled.tbody`
    font-size: 25px;

    & > tr > td {
        border-bottom: 2px solid #DADADA;

        & input {
            height: 40px;
            font-size: 25px;

            &::placeholder {
                font-size: 25px;
            }
        }
    }
`;

const AddItem = styled.button`
    background: #00A4F7;
    color: #fff;
    height: 66px;
    padding: 5px 15px;
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
    height: 60px;
    background: ${props => props.type === 'remove_item' ? '#dc3545' : '#fff'};
    box-shadow: 0px 0 2px 1px #dc3545;
    color: ${props => props.type === 'remove_item' ? '#fff' : '#dc3545'};
    opacity: ${props => props.type === 'remove_item' ? 0.1 : 1};
    
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
            border-bottom: 5px solid #00A4F7;
        }
    }

    & > td {
        border-bottom: none;
    }

    & > td {
        padding: 20px 15px;

        & > input[type="checkbox"] {
            width: 25px;
            height: 25px;
            border: none;
            outline: none;
            margin: 0;
            position: relative;
            top: 5px;
            margin-right: 10px;
        }

    }
`;

const SettingsPanel = styled.form`
    display: flex;
    align-items: center;
    width: 300px;
    
    position: relative;
    left: 564px;
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    font-size: 25px;

    select {
        border: none;
        outline: none;
        height: 50px;
        width: 100%;
        margin-bottom: 10px;

        option {
            font-size: 25px;
        }

        &:focus {
            border: none;
            outline: none;
        }
    }

    input {
        width: 100%;
        border: none;
        outline: none;
        height: 50px;
        margin-bottom: 10px;
        border-bottom: 2px solid #DADADA;

        &:focus {
            border: none;
            outline: none;
            border-bottom: 5px solid #00A4F7;
        }
    }

    button {
        padding: 10px 10px;
    }
`;

const Hint = styled.p`
    position: absolute;
    font-size: 30px;
    box-shadow: inset 0px 0px 6px 1px #00A4F7;
    border-radius: 5px;
    padding: 10px;
    left: 50%;
    transform: translateX(-50%);
    top: 80px;
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
                const response = await fetch('/astronauts', {
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

    return (
        <>
            <SettingsPanel>
                <select name="selectList" size="1">
                    <option defaultValue>Name</option>
                    <option>First Flight Date</option>
                    <option>Days In Space</option>
                    <option>Mission Name</option>
                    <option>Multiple</option>
                </select>
                <input  />
                <button>Filter</button>
            </SettingsPanel>
            {
                isHint && (
                    <Hint>Сlick on column heading to sort</Hint>
                )
            }
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
                                Clear fields
                            </Remove>
                        </td>
                    </NewElementFileds>
                </Tbody>
            </TableContainer>
        </>
    )
}

export default Table;