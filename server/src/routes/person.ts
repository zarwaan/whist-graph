import express from 'express'
import { fetchFromTMDb, fetchResourceById } from '../utils';

const personRouter = express.Router();

interface media {
    id: string,
    type: "movie" | "tv"
}


const joinIdAndName = (c: any) => {
    return JSON.stringify({
        id: c.id,
        name: c.name
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

personRouter.get('/common',async (req, res) => {
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
                    ...credits.cast.map((c: any) => joinIdAndName(c)),
                    ...credits.crew.filter((c: any) => {
                        if(c.job){
                            return (c.job as string).toLowerCase() === "director"
                        }
                        return false
                    }).map((c: any) => joinIdAndName(c))
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
        return res.status(500).json({error: error.message});
    }
})

personRouter.get('/:id',fetchResourceById('person'));

personRouter.get('/:id/images',fetchResourceById('person','/images'));

export default personRouter;