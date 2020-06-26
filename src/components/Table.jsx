import React, {useState, useEffect} from 'react';
import styled from 'styled-components';


const TableContainer = styled.table`
    font-family: 'Montserrat';
    width: 1320px;
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
        border: none;
        outline: none;
        cursor: pointer;
        transition: all 0.4s;
    }
`;

const Thead = styled.thead`
    font-size: 25px;

    & th {
        border-bottom: 2px solid #00A4F7;
    }

    & th:nth-child(2) {
        width: 20%;
    }

    & th:nth-child(3) {
        width: 20%;
    }

    & th:nth-child(4) {
        width: 20%;
    }

    & th:nth-child(5) {
        width: 30%;
    }
    
    & th:nth-child(6) {
        width: 10%;
    }

`;

const Tbody = styled.tbody`
    font-size: 20px;

    & > tr > td {
        border-bottom: 2px solid #DADADA;
    }
`;

const AddItem = styled.button`
    background: #00A4F7;
    color: #fff;
    height: 52px;
    padding: 5px 10px;
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
    height: 52px;
    background: ${props => props.type === 'remove_item' ? '#dc3545' : '#fff'};
    box-shadow: 0px 0 2px 1px #dc3545;
    color: ${props => props.type === 'remove_item' ? '#fff' : '#dc3545'};
    opacity: ${props => props.type === 'remove_item' ? 0 : 1};
    
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
    }
`;

const Table = (props) => {
    const [data, setData] = useState([]);
    const [newElementFields, setNewElementFields] = useState({
        name: '',
        date: '',
        days: '',
        mission: '',
        isMultiple: '',
    });
    
    useEffect(() => {
        if (props.data.length > 0) {
            setData(props.data);
        }
    }, [props.data])

    const handleChange = ({target}) => {
        switch(target.name) {
            case 'name': {
                setNewElementFields({
                    ...newElementFields,
                    name: target.value,
                });
                break;
            }
            case 'date': {
                setNewElementFields({
                    ...newElementFields,
                    date: target.value,
                });
                
                break;
            }
            case 'days': {                
                setNewElementFields({
                    ...newElementFields,
                    days: target.value,
                });
                break;
            }
            case 'mission': {
                setNewElementFields({
                    ...newElementFields,
                    mission: target.value,
                });
                break;
            }
            case 'multiple': {
                setNewElementFields({
                    ...newElementFields,
                    isMultiple: target.value,
                });
                break;
            }
            default: 
                break;
        }
    }

    const clearFields = () => {
        setNewElementFields({
            name: '',
            date: '',
            days: '',
            mission: '',
            isMultiple: '',
        })
    }

    const removeItem = (id) => {
        setData(data.filter((element) => element.id !== id));
    }

    const addNewItem = async (e) => {
        try {
            const response = await fetch('/astronauts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newElementFields),
            })
            const result = await response.json();
        } catch (e) {
            throw new Error();
        }
    }

    const areFilled = (elementFields) => {
        if (!elementFields.name || !elementFields.date || !elementFields.days || !elementFields.mission || !elementFields.isMultiple) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <TableContainer>
            <Thead>
                <tr>
                    <th className="without-border"></th>
                    <th>Name</th>
                    <th>First Flight Date</th>
                    <th>Days In Space</th>
                    <th>Mission name</th>
                    <th>Multiple</th>
                    <th className="without-border"></th>           
                </tr>
            </Thead>
            <Tbody>
                {
                    data.map(({name, date, days, mission, isMultiple, id}) => {
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
                            onClick={addNewItem}
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
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                    <td className="without-border"> 
                        <input 
                            type="number" 
                            name="date" 
                            value={newElementFields.date} 
                            placeholder="date" 
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                    <td className="without-border">
                        <input 
                            type="number" 
                            name="days" 
                            value={newElementFields.days} 
                            placeholder="days" 
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                    <td className="without-border">
                        <input 
                            type="text" 
                            name="mission" 
                            value={newElementFields.mission} 
                            placeholder="mission" 
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                    <td className="without-border">
                        <input 
                            type="text" 
                            name="multiple" 
                            value={newElementFields.isMultiple} 
                            placeholder="multiple" 
                            onChange={(e) => handleChange(e)}
                        />
                    </td>
                    <td className="without-border">
                        <Remove 
                            type="clear_list" 
                            onClick={clearFields}
                        >
                            Clear fields
                        </Remove>
                    </td>
                </NewElementFileds>
            </Tbody>
        </TableContainer>
    )
}

export default Table;