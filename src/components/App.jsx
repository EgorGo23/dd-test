import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import {withDataFetching} from './hoc';
import Table from './Table';
import AddItemPanel from './AddItemPanel';

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
`;

const App = ({dataFromApi}) => {
    const [astronauts, setAstronauts] = useState([]);

    useEffect(() => {
        if (!!dataFromApi.data) {
            // Проставляем id каждому элементу массива астронавтов
            const withId = dataFromApi.data.reduce((acc, element) => {
                if (!element.id) {
                    element.id = uuidv4();
                    acc.push(element);
                }
                
                return acc;
            }, [])
            setAstronauts(withId);
        }
    }, [dataFromApi.data]);
    
    return (
        <AppContainer>
            {
                dataFromApi.isLoading && (
                    <h1>Загрузка...</h1>
                )
            }
            {
                dataFromApi.isError && (
                    <h1>Ошибка!</h1>
                )
            }
            {
                !!dataFromApi.data && (
                    <Table data={astronauts} />
                )
            }
        </AppContainer>
    )
}

export default withDataFetching(App)('/astronauts');