import axios from 'axios';
import express, { json } from 'express';
import fetch from 'node-fetch';




const router = express.Router();


router.get('/', async (req, res) => {  
  try {
      res.json("it works");
  } catch (error) {
      console.error('Error occurred:', error.response ? error.response.data : error.message);
      res.status(500).send('Error fetching data');
  }
});


// router.get('/', async (req, res) => {
//     const url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=fb65aa975bbfceef38074d901769c896&language=en-US&page=1';
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjY1YWE5NzViYmZjZWVmMzgwNzRkOTAxNzY5Yzg5NiIsInN1YiI6IjY1NTA4YjFhMDgxNmM3MDBmZDJkNmFmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.r0IQV71sc8w7YZggwWG3f5TWx5__lBedfQDqghl9mnY'
//       }
//     };
    
//     fetch(url, options)
//       .then(res => res.json())
//       .then(json => res.send(json))
//       .catch(err => console.error('error:' + err));

// // res.json(result)
// })

export{router as isApiWorking};