import express from 'express';
import { getIMDbIdFromTMDBId } from './functions.js';


const router = express.Router();

router.get('/', async (req, res) => {
    const { id, isMovie } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'ID query parameter is required.' });
    }

    const isMovieBool = isMovie === 'true';

    try {
        const imdbId = await getIMDbIdFromTMDBId(id, isMovieBool);
        res.json({ imdbId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export { router as TMBDtoIMDBRouter};
