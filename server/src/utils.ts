import { Request, Response } from 'express';
import * as dotenv from 'dotenv';

dotenv.config();
const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;

/**
 * Static fetch options detailing method and headers (accept and Authorisation Bearer) 
 */
const fetchOptions: RequestInit = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${BEARER_TOKEN}`
    }
}

const baseUrl: string = "https://api.themoviedb.org/3";
// const imagesUrl: string = "https://image.tmdb.org/t/p/";

type Resource = "movie" | "tv" | "person";

/**
 * Constructs TMD API URL using, fetches data from the provided endpoint and sends the result as an HTTP response using the Express Response object
 * 
 * @param path The TMDb api endpoint
 * @param res The express Response object
 */
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

/** 
 * Reusable method for GET resource/:id and GET resource/:id/images.
 * 
 * Can be used for movie, tv and person.
 * 
 * Can only be used as an express callback function.
 * 
 * @param resource The resource; can only be "movie", "tv" or "person"
 * @param subpath The subpath, if any like "/images" 
*/
export const fetchResourceById = (resource: Resource, subpath: "" | "/images" = "") => 
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const path = `${resource}/${id}${subpath}`;
        await fetchAndReturnFromTmdb(path, res)
    }

export const fetchFromTMDb = async (path: string) : Promise<any> => {
    try{
        const response = await fetch(`${baseUrl}/${path}`,fetchOptions);
        const result = await response.json();
        if(response.ok){
            return result
        }
        else {
            console.log(result);
            return null
        }
    }
    catch (error){
        console.error(error);
        return null;
    }
}