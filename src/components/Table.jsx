import React, {useState} from 'react';
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

    .not-border: {
        border: none;
    }
`;

const Thead = styled.thead`
    font-size: 25px;
    

    & th:nth-child(1) {
        border-bottom: none;
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

    & > tr {
        border-bottom: 2px solid #DADADA;
    }
`;

const NewElementFileds = styled.tr`
    border: none;

`;

const Table = (props) => {
    const [newElement, setNewElement] = useState({
        name: '',
        date: '',
        days: '',
        mission: '',
        isMultiple: '',
    })

    return (
        <TableContainer>
            <Thead>
                <tr>
                    <th className="not-border"></th>
                    <th>Name</th>
                    <th>First Flight Date</th>
                    <th>Days In Space</th>
                    <th>Mission name</th>
                    <th>Multiple</th>
                    <th className="not-border"></th>
                </tr>
            </Thead>
            <Tbody>
                {
                    props.data.map(({name, date, days, mission, isMultiple}) => {
                        return (
                            <tr key={name}>
                                <td className="not-border"></td>
                                <td>{name}</td>
                                <td>{date}</td>
                                <td>{days}</td>
                                <td>{mission}</td>
                                <td>{String(isMultiple)}</td>
                                <td className="not-border"></td>
                            </tr>  
                        );
                    })
                }
                <NewElementFileds>
                    <td className="not-border"></td>
                    <td>
                        <input type="text" name="name" />
                    </td>
                    <td>
                        <input type="number" name="date" />
                    </td>
                    <td>
                        <input type="number" name="days" />
                    </td>
                    <td>
                        <input type="text" name="mission" />
                    </td>
                    <td>
                        <input type="text" name="multiple" />
                    </td>
                    <td>
                        <input type="button" />
                    </td>
                    <td className="not-border"></td>
                </NewElementFileds>
            </Tbody>
        </TableContainer>
    )
}

export default Table;