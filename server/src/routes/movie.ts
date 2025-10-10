import express from 'express'
import { fetchResourceById } from '../utils';

const movieRouter = express.Router();

// movie routes
movieRouter.get('/:id',fetchResourceById("movie"));
movieRouter.get('/:id/images',fetchResourceById("movie","/images"));

export default movieRouter;