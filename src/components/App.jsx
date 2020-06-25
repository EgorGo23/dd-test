import React, {} from 'react';
import styled from 'styled-components';
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
                    <Table data={dataFromApi.data} />
                )
            }
        </AppContainer>
    )
}

export default withDataFetching(App)('/api/astronauts');