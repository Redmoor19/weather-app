import { useState, useCallback } from "react";

export const useHttp = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const request = useCallback( async (
        url,
        method = "GET", 
        body = null, 
        headers
        ) => {
            setLoading(true);
            try {
                const response = await fetch(url, {method, body, headers});
                if (!response.ok) {
                    throw new Error(`Couldn't fetch ${url}, response status ${response.status}:${response.statusText}`);
                };

                const data = await response.json()

                setLoading(false);
                return data;
            } catch (err) {
                setLoading(false);
                setError(err.message);
                throw(err);
            }
    }, []);

    const clearError = useCallback( () => setError(null), [])

    return {
        error,
        loading,
        request,
        clearError
    }
}