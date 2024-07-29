import { useState, useCallback } from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

export const useAxios = () => {
    const [fetchHandler, setFetchHandler] = useState({
        response: undefined,
        error: "",
        loading: true,
    });

    const customFetchData = useCallback(async (params) => {
        setFetchHandler({ response: undefined, error: "", loading: true });
        try {
            const result = await axios.request(params);
            setFetchHandler({
                response: result.data,
                error: "",
                loading: false,
            });

            return result;
        } catch (error) {
            console.error("Axios error:", error);
            setFetchHandler({
                response: undefined,
                error: error.message,
                loading: false,
            });
        }
    }, []);

    return { fetchHandler, customFetchData };
};
