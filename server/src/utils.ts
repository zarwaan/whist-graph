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

/**
 * Fetches and returns the response from the specified TMDb API endpoint.
 * 
 * @param path The TMDb API endpoint
 * @returns The TMDb API response or null if errors are encountered
 */
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

/**
 * Return wether person credit is a self credit or not
 * 
 * @param media The media object containing name, title and character
 * @returns false if credit is a self credit or media genre is reality/talk; true otherwise 
 */
export const notSelfCredit = (media: any) : boolean => {
    return (
        media['character'] !== "Self" && (media['character'] || media['roles']?.length > 0) &&
        media['character'] !== "Self - Guest" &&
        media['character'] !== "Self - Host" &&
        !media['character'].includes("Self -") &&
        !media['character'].includes("archive footage") &&
        media['character'].toLowerCase() !== "himself" &&
        media['character'].toLowerCase() !== "herself"
    )
}

export const titleExistsAndIsNotRealityOrTalk = (media: any) : boolean => {
    return (
        (media['title'] || media['name']) && 
        !media['genre_ids'].includes(10764) &&
        !media['genre_ids'].includes(10767)
    )
}