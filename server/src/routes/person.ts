import express from 'express'
import { fetchResourceById } from '../utils';

const personRouter = express.Router();

personRouter.get('/:id',fetchResourceById('person'));

personRouter.get('/:id/images',fetchResourceById('person','/images'));

export default personRouter;