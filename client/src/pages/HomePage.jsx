import { useState , useEffect, useRef} from 'react'
import React from 'react'
import axios from 'axios'
import { json } from 'react-router-dom';

//get six=ze frpom function
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}


// async function getPopMovies() {
//   const [movies,setmovies] = useState([Movie])
//   try {
//     const result = await axios.get("http://localhost:3001/popularmovies");
//     const moviesData = response.data.results.map(item => {
//       setmovies(prevMvs => [...prevMvs,new Movie(item.mvname, item.mvdesc, item.mvurl, item.mvid, item.mvrating, item.mvratedusers) ])
//     });

//     console.log(result.data.results[0]); // Access the response data
//   return movies

//   } catch (e) {
//     console.error(e);
//     // Handle the error appropriately
//   return movies

//   }
// }

export const HomePage = () => {
  const [width, height] = useWindowSize();
  const [movies,setMovies] = useState([])
  useEffect(() => {
    const getPopMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/popularmovies");
        const firstTenMovies = response.data.results.slice(0, 10); // Get only the first 10 items
        const moviesData = firstTenMovies.map(item => 
          new Movie(item.title, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count)
        );
        setMovies(moviesData);
      } catch (e) {
        console.error(e);
      }
    };
    getPopMovies();
  }, []);




  return (
    <div>
      <div className="carouselview">
      <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
  <div class="carousel-inner">

    <div class="carousel-item active">
      <img src="https://picsum.photos/300/200 " class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="..."/>
    </div>


  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleRide" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>


      <div className='text-white'>
  {movies.map((movie, index) => (
    <div key={index}>{movie.title}</div> // Use 'title' instead of 'mvname'
  ))}
</div>


    </div>
  )
}


class Movie {
  constructor(title, overview, poster_path, id, vote_average, vote_count) {
    this.title = title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.id = id;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }
}