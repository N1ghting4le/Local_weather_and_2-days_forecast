import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, headers = {'Content-Type': 'application/json'}, method = 'GET', body = null) => {

        setProcess('loading');

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            return await response.json();
        } catch(e) {
            setProcess('error');
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('loading'); 
    }, []);

    return {request, clearError, process, setProcess}
}