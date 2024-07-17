import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

export const useAxios = (axiosParams) => {
    const [state, setState] = useState({
        response: undefined,
        error: '',
        loading: true,
    });

    const fetchData = useCallback(async (params) => {
        setState({ response: undefined, error: '', loading: true });
        try {
            const result = await axios.request(params);
            setState({ response: result.data, error: '', loading: false });
        } catch (error) {
            setState({ response: undefined, error: error.message, loading: false });
        }
    }, []);

    useEffect(() => {
        fetchData(axiosParams);
    }, []);

    return state;
};