import axios from 'axios';
import express from 'express';

const router = express.Router();

// async function getTvShowData(imdbId) {
//     try {
//         const response = await axios.get(`http://api.tvmaze.com/lookup/shows?imdb=${imdbId}`);
//         console.log(response.data);
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// }

router.get('/', async (req, res) => {
    const id = req.query.id;
    const isMovie = req.query.ismovie === 'true';

    if (!id) {
        return res.status(400).send({ message: 'ID query parameter is required' });
    }
    
    try {
        let response;
        if (isMovie) {
            const url = `http://api.themoviedb.org/3/movie/${encodeURIComponent(id)}/similar?api_key=fb65aa975bbfceef38074d901769c896&language=en-US`;
            response = await axios.get(url);
        } else {
            const url = `http://api.themoviedb.org/3/tv/${encodeURIComponent(id)}/similar?api_key=fb65aa975bbfceef38074d901769c896&language=en-US`;
            response = await axios.get(url);
        }
        res.json(response.data);
    } catch (error) {
        console.error('Error occurred:', error.response ? error.response.data : error.message);
        res.status(500).send('Error fetching data');
    }
});

export { router as getSimilarsByID};
