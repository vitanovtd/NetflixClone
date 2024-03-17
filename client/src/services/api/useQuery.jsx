import { useRef } from "react";

const useQuery = () => {
    const isMounted = useRef(true);
    const abortControllerInstance = useRef(new AbortController());

    const makeRequest = async (url) => {
        let response = null;
        let result = null;
        try {
            response = await fetch(url, {
                method: "GET",
                signal: abortControllerInstance.signal
            });
            result = await response.json();
            if (!response.ok) {
                throw new Error("Bad Request");
            }
            if (!isMounted.current) {
                throw new Error("IsAborted");
            }
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const cancelRequest = () => {
        isMounted.current = false;
        abortControllerInstance.current.abort();
    }

    return [makeRequest, cancelRequest];
}

export default useQuery;
