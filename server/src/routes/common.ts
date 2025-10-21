import express from 'express'
import { fetchFromTMDb, notSelfCredit, titleExistsAndIsNotRealityOrTalk } from '../utils';

const commonRouter = express.Router();

interface media {
    id: string,
    type: "movie" | "tv"
}

const stringifyObject = (c: any, resource: "media" | "person") : string=> {
    if(resource === "media")
        return JSON.stringify({
            id: c.id,
            type: c.media_type,
            title: c.title || c.name,
            imagePath: c.poster_path || null
        })
    else
        return JSON.stringify({
            id: c.id,
            name: c.name,
            imagePath: c.profile_path || null
        })
}

const makeMediaIdObject = (mediaQuery: string) => {
    const mediaArray = mediaQuery.split(',');
    const media: Array<media> = [];
    mediaArray.forEach(m => {
        if(m.substring(0,2) === "tv")
            media.push({
                id: m.substring(2),
                type: "tv"
            })
        else if(m.substring(0,5) === "movie")
            media.push({
                id: m.substring(5),
                type: "movie"
            })
        else {
            console.error(`${m} is not a valid media identifier`)
        }
    })
    return media;
}

commonRouter.get('/media', async (req, res) => {
    if(!req.query.personIds) return res.status(400).json({error: "Missing person ids"});

    const personIds = (req.query.personIds as string).split(',');

    try{
        const allCredits = await Promise.all(
            personIds.map(async id => await fetchFromTMDb(`person/${id}/combined_credits`))
        )

        const commonMedia = 
            allCredits.reduce((common,credits,index) => {
                const items = [
                    ...credits.cast.map((c: any) => notSelfCredit(c) && titleExistsAndIsNotRealityOrTalk(c) ? stringifyObject(c, "media") : "").filter((v: string) => v !== ""),
                    ...credits.crew.filter((c: any) => ((c.job as string).toLowerCase() === "director" && c.media_type==="movie")).map((c: any) => stringifyObject(c, "media"))
                ];

                return index === 0 ? new Set(items) : new Set([...common].filter(c => items.includes(c)))
            },new Set<number>());
        
        const common = [...commonMedia].map(c => JSON.parse(c));

        return res.status(200).json({
            common
        })
    }
    catch(error: any){
        console.error(error);
        return res.status(500).json({error: error.message, name: error.name});
    }
})

commonRouter.get('/people', async (req, res) => {
    const mediaQuery = req.query.media;
    if(!mediaQuery) return res.status(400).json({error: "No media identifiers found!"})

    const media = makeMediaIdObject(mediaQuery as string);

    try {
        const allCredits = await Promise.all(
            media.map(async m => 
                m.type === "movie" ?
                await fetchFromTMDb(`movie/${m.id}/credits`) :
                await fetchFromTMDb(`tv/${m.id}/aggregate_credits`)
            )
        )

        const commonPeople = 
            allCredits.reduce((common, credits, index) => {
                const items = [
                    ...credits.cast.map((c: any) => stringifyObject(c, "person")),
                    ...credits.crew.filter((c: any) => {
                        if(c.job){
                            return (c.job as string).toLowerCase() === "director"
                        }
                        return false
                    }).map((c: any) => stringifyObject(c, "person"))
                ];

                return index === 0 ? new Set(items) : new Set([...common].filter(c => items.includes(c)))
            },new Set<number>());

        const common = [...commonPeople].map(c => JSON.parse(c));

        return res.status(200).json({
            common
        })
    } 
    catch(error: any){
        console.error(error);
        return res.status(500).json({error: error.message, name: error.name});
    }
})

export default commonRouter;