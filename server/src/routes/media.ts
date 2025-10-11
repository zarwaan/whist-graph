import express from 'express'
import { fetchFromTMDb, notSelfCredit, titleExistsAndIsNotRealityOrTalk } from '../utils';

const mediaRouter = express.Router();

const joinIdAndType = (c: any,director: boolean = false) : string => {
    // const obj: any = {
    //     id: c.id,
    //     type: c.media_type,
    //     title: c.title || c.name
    // };
    // if(director)
    //     obj.director = true
    // return JSON.stringify(obj)
    director;
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
                    ...credits.cast.map((c: any) => notSelfCredit(c) && titleExistsAndIsNotRealityOrTalk(c) ? joinIdAndType(c) : "").filter((v: string) => v !== ""),
                    ...credits.crew.filter((c: any) => ((c.job as string).toLowerCase() === "director" && c.media_type==="movie")).map((c: any) => joinIdAndType(c, true))
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