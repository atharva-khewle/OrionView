import axios from 'axios';
import express, { json } from 'express';
import fetch from 'node-fetch';




const router = express.Router();


router.get('/', async (req, res) => {
  const query = req.query.query;
  const page = req.query.page || 1;
  const content = req.query.content || 'movie'; // Default to 'movie' if not provided

  if (!query) {
      return res.status(400).send({ message: 'Query is required' });
  }

  let url;
  if (content === 'movie') {
      url = `http://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=fb65aa975bbfceef38074d901769c896&language=en-US&page=${page}`;
  } else if (content === 'TV') {
      url = `http://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(query)}&api_key=fb65aa975bbfceef38074d901769c896&language=en-US&page=${page}`;
  } else {
      return res.status(400).send({ message: 'Invalid content type. Please use "movie" or "TV".' });
  }

  try {
      const response = await axios.get(url);
      res.json(response.data);
  } catch (error) {
      console.error('Error occurred:', error.response ? error.response.data : error.message);
      res.status(500).send('Error fetching data');
  }
});

export{router as searchQueryRouter};