import express, {  } from 'express';
import { fetchFromTMDb } from '../utils';
import { Media } from '../types/media';
import { Person } from '../types/person';

const searchRouter = express.Router();

const makePersonResponse = (res: any) => {
    return res.results
            .map((r: any) : Person => {
                return {
                    id: r.id,
                    type: "person",
                    title: r.name,
                    imagePath: r.profile_path ?? ""
                }   
            })
}

const makeMediaReponse = (res: any) => {
    return res.results
            .filter((r:any) => r.media_type === "movie" || r.media_type === "tv")
            .map((r: any) : Media => {
                return {
                    id: r.id,
                    type: r.media_type,
                    title: r.title || r.name,
                    year: (r.release_date as string || r.first_air_date as string)?.substring(0,4) ?? "",
                    imagePath: r.poster_path ?? ""
                }   
            })
}

searchRouter.get('/media',async (req,res) => {
    const mediaTitle = req.query.q;
    const path = `search/multi?query=${encodeURIComponent(mediaTitle as string)}`;
    // await fetchAndReturnFromTmdb(path,res)
    let result = await fetchFromTMDb(path);
    if(result)
    {
        result = makeMediaReponse(result)
        return res.status(200).json({result});
    }
    else return res.status(500).json({message: "Some error occured"})
});

searchRouter.get('/person',async (req, res) => {
    const personName = req.query.q;
    const path = `search/person?query=${encodeURIComponent(personName as string)}`
    // await fetchAndReturnFromTmdb(path, res);
    let result = await fetchFromTMDb(path);
    if(result) {
        result = makePersonResponse(result)
        return res.status(200).json({result});
    }
    else return res.status(500).json({message: "Some error occured"})
});

export default searchRouter;