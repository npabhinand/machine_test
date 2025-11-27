import axios from "axios";
import { useState } from "react";

const useNetworkRequest = <T = any>() => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const fetchData = async (url: string, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios(`http://localhost:3005${url}`, options);
            const result = response.data;
            setData(result);
            return result; 
        } catch (err) {       
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    return { 
        data, 
        loading, 
        error, 
        fetchData,
        reset 
    };
};

export default useNetworkRequest;