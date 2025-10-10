import { Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

export const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
}

export const baseUrl: string = "https://api.themoviedb.org/3"

export const fetchAndReturnFromTmdb = async (path: string ,res: Response) => {
    try{
        const response = await fetch(
            `${baseUrl}/${path}`,
            fetchOptions
        );
        const result = await response.json();

        if(response.ok) {
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json(result)
        }
    }
    catch(error){
        console.error(error);
        return res.status(500).json(error)
    }
}