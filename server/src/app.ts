import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import searchRouter from './routes/search';
import movieDetailsRouter from './routes/movie';

dotenv.config();

// env vars
// const API_KEY = process.env.TMDB_API_KEY;
// const BEARER_TOKEN = process.env.TMDB_BEARER_TOKEN;
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
app.use(cors({
    origin: CLIENT_URL
}));
app.use(express.json());

app.get('/', (_req,res) => {
    res.send("Server running!")
})

app.use('/api/search',searchRouter);
app.use('/api/movie',movieDetailsRouter);

app.listen(PORT,() => console.log("Server running!"))