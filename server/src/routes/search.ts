import express from 'express';
import { fetchAndReturnFromTmdb } from '../utils';

const searchRouter = express.Router();

searchRouter.get('/media',async (req,res) => {
    const mediaTitle = req.query.q;
    const path = `search/multi?query=${encodeURIComponent(mediaTitle as string)}`;
    await fetchAndReturnFromTmdb(path,res)
});

searchRouter.get('/person',async (req, res) => {
    const personName = req.query.q;
    const path = `search/person?query=${encodeURIComponent(personName as string)}`
    await fetchAndReturnFromTmdb(path, res);
})

export default searchRouter;