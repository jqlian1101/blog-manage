import React from "react";

export const useFetch = (fetchFn, options = {}) => {
    const [response, setResponse] = React.useState(null);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchFn(options);
                setResponse(res);
            } catch (error) {
                console.log("error : ", error);
                setError(error);
            }
        };
        fetchData();
    }, []);

    return { response, error };
};

export default {
    useFetch
};
