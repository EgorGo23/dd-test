import React, { useState, useEffect } from "react";

export const withDataFetching = (Wrapped) => (link) => {
    const WithDataFetchingComponent = () => {
        const [data, setData] = useState(null);
        const [isLoading, setIsLoading] = useState(false);
        const [isError, setIsError] = useState(false);
        
        useEffect(() => {
            const fetchData = async () => {
                setIsError(false);
                setIsLoading(true);

                try {
                    const response = await fetch(link);
                    const body = await response.json();
                    
                    if (response.status === 500) {
                        throw new Error(body);
                    } else {
                        setData(body);
                    }
                } catch (error) {
                    setIsError(true);
                }

                setIsLoading(false);
            }

            fetchData();
        }, []);
        
        return (
            <Wrapped dataFromApi={{data, isLoading, isError}} />
        )
    }
    
    return WithDataFetchingComponent;
}

