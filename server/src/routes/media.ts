import express from 'express'
import { fetchFromTMDb } from '../utils';

const mediaRouter = express.Router();

const notSelfCredit = (media: any) => {
    return (media['title'] || media['name']) &&
            (media['character'] !== "Self" && media['character'] &&
            media['character'] !== "Self - Guest" &&
            media['character'] !== "Self - Host" &&
            !media['character'].includes("Self -") &&
            media['character'].toLowerCase() !== "himself" &&
            media['character'].toLowerCase() !== "herself" &&
            (!media['genre_ids'].includes(10764)) &&
            (!media['genre_ids'].includes(10767))
        )
}

const joinIdAndType = (c: any) : string => {
    return JSON.stringify({
        id: c.id,
        type: c.media_type,
        title: c.title || c.name
    })
}

mediaRouter.get('/common', async (req, res) => {
    if(!req.query.personIds) return res.status(400).json({error: "Missing person ids"});

    const personIds = (req.query.personIds as string).split(',');

    try{
        const allCredits = await Promise.all(
            personIds.map(async id => await fetchFromTMDb(`person/${id}/combined_credits`))
        )

        const commonMedia = 
            allCredits.reduce((common,credits,index) => {
                const items = [
                    ...credits.cast.map((c: any) => notSelfCredit(c) ? joinIdAndType(c) : "").filter((v: string) => v !== "")
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
        return res.status(500).json({error: error.message});
    }
})

export default mediaRouter;