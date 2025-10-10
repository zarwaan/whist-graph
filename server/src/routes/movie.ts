import express from 'express'
import { fetchAndReturnFromTmdb } from '../utils';

const movieDetailsRouter = express.Router();

movieDetailsRouter.get('/:id', async (req, res) => {
    const movieId = req.params.id;
    const path = `movie/${movieId}`;
    await fetchAndReturnFromTmdb(path,res);
})

export default movieDetailsRouter;
