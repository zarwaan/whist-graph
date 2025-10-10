import express from 'express'
import { fetchResourceById } from '../utils';

const tvRouter = express.Router();

//tv routes
tvRouter.get('/:id',fetchResourceById('tv'));
tvRouter.get('/:id/images',fetchResourceById('tv','/images'));

export default tvRouter;