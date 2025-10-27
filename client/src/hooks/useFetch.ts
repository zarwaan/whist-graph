import { useEffect, useState } from "react";

interface Error {
    message: string
}

export default function useFetch(endpoint: string, additionalOptions: object = {}, autofetch: boolean = false) {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<any>(null);

    const fetchData = async (endpoint: string) => {
        setLoading(true);
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL_ROOT}/${endpoint}`,{
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                ...additionalOptions
            });
            const result = await response.json();
            if(response.ok){
                setData(result)
            }
            else{
                setError({message: "An error occured"})
                console.log(result);
            }
        }
        catch(error: any){
            setError({message: error.message})
            setData(null)
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(autofetch)
            fetchData(endpoint);
    },[endpoint, additionalOptions, autofetch])

    return {
        data, loading, error, fetchData
    }
}