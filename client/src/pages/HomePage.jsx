import { useState , useEffect, useRef} from 'react'
import React from 'react'
import axios from 'axios'
import { json, useNavigate } from 'react-router-dom';
import'./../pages/HomePage.css'
import { Movie, Series } from './MediaClasses'; // Import classes from the new file

//get six=ze frpom function
export function useWindowSize() {
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




export const HomePage = () => {
  const [width, height] = useWindowSize();
  const [series, setSeries] = useState([]);
  const [movies,setMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {

    const getTopRatedMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/topratedmovies");
        const firstTenTopRatedMovies = response.data.results.slice(0, 10); // Get only the first 10 movies
        const moviesData = firstTenTopRatedMovies.map(item => 
          new Movie(item.title, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
        );
        setTopRatedMovies(moviesData);
      } catch (e) {
        console.error(e);
      }
    };


    const getPopSeries = async () => {
      try {
        const response = await axios.get("http://localhost:3001/popularseries");
        const firstTenSeries = response.data.results.slice(0, 10); // Adjust number as needed
        const seriesData = firstTenSeries.map(item => 
          new Series(item.name, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
        );
        setSeries(seriesData);
      } catch (e) {
        console.error(e);
      }
    };


    const getPopMovies = async () => {
      try {
        const response = await axios.get("http://localhost:3001/popularmovies");
        const firstTenMovies = response.data.results.slice(0, 10); // Get only the first 10 items
        const moviesData = firstTenMovies.map(item => 
          new Movie(item.title, item.overview, item.poster_path, item.id, item.vote_average, item.vote_count, item.backdrop_path)
        );
        setMovies(moviesData);
      } catch (e) {
        console.error(e);
      }
    };


    getTopRatedMovies();
    getPopMovies();
    getPopSeries();
  }, []);

  const isthisMovie = (data) => data instanceof Movie ? 'Movie' : 'Series';

  const navigate = useNavigate();

  const handleNavigate = (seriesId, isMovieParam) => {
    navigate(`/mvinfo`, { state: { isMovie: isMovieParam, id: seriesId } });
  };



  return (
    <div className='HomePage'>

      <div className="carouselview">
      <div id="carouselExampleRide" class="carousel slide" data-bs-ride="true">
  <div class="carousel-inner">

    {/* <div class="carousel-item active">
      <img src="https://picsum.photos/300/200 " class="d-block w-100" alt="..."/>
    </div> */}
    {movies.map((movie, index) => (
      
    <div class={`carousel-item  ${index==0?"active":""}`} key={index} onClick={() => handleNavigate(movie.id, isthisMovie(movie))}>
      <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} class={`d-block w-100 carmvimg`} alt="..."/>

      <div className="carmvdesc">
      <div className="carmvname" style={{fontSize:`${(width/height)<=0.6?"25px":"50px"}`}}>
        {movie.title}
      </div>
      </div>


    </div>

  ))}


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






  <div className='text-white downHome'>


    <div className="title" style={{fontSize:`${(width/height)<=0.6?"20px":"25px"}`}}>
      Popular Series</div>


    <div className="popularSeries">
    {series.map((series, index) => (
    
    <div key={index} className='card' onClick={() => handleNavigate(series.id, isthisMovie(series))}>
      <div className="cardimgdiv">
        <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className='cardimg' alt="" />
      </div>
      <div className="carddesc">

      <div className="cardrating flex flex-row ">
        <div className=' justify-center flex'>     
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="14" width="14" className='cardstar'>
        <path fill='#ffffff' d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        </div>
      <div className='flex text-white lkj'>{series.vote_average.toFixed(1)}</div>
      </div>



      <div className="cardmvname"><p>{series.title}</p></div>




        
      </div>
    </div>
  ))}
    </div>


    <div className="title" style={{fontSize:`${(width/height)<=0.6?"20px":"25px"}`}}>
      Top Rated Movies</div>


    <div className="popularSeries">
    {topRatedMovies.map((series, index) => (
    
    <div key={index} className='card' onClick={() => handleNavigate(series.id, isthisMovie(series))}>
      <div className="cardimgdiv">
        <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className='cardimg' alt="" />
      </div>
      <div className="carddesc ">



      <div className="cardrating flex flex-row ">
        <div className=' justify-center flex'>     
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="14" width="14" className='cardstar'>
        <path fill='#ffffff' d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        </div>
      <div className='flex text-white lkj'>{series.vote_average.toFixed(1)}</div>
      </div>

      <div className="cardmvname"><p>{series.title}</p></div>


      </div>
    </div>
  ))}
    </div>


</div>


    </div>
  )
}


export const SeriesGrid = ({ seriesData }) => {
  const isthisMovie = (data) => data instanceof Movie ? 'Movie' : 'Series';
  const navigate = useNavigate();

  const handleNavigate = (seriesId, isMovieParam) => {
    navigate(`/mvinfo`, { state: { isMovie: isMovieParam, id: seriesId } });
  };


  return (
    <div className="popularSeries">
      {seriesData.map((series, index) => {
        const url = `https://image.tmdb.org/t/p/w500${series.poster_path}`;
        const fallbackUrl = './../../assets/notfound2.png';

        return (
          <div key={index} className='card' onClick={() => handleNavigate(series.id, isthisMovie(series))}>
            <div className="cardimgdiv">
              <img 
                src={url} 
                onError={(e) => e.target.src = fallbackUrl} 
                className='cardimg' 
                alt={series.title || 'Image not available'} 
              />
            </div>
            <div className="carddesc">
              <div className="cardrating flex flex-row ">
              <div className=' justify-center flex'>     
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="14" width="14" className='cardstar'>
        <path fill='#ffffff' d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
        </div>
      <div className='flex text-white lkj'>{series.vote_average.toFixed(1)}</div>
              </div>


              <div className="cardmvname"><p>{series.title}</p></div>
              
            </div>
          </div>
        );
      })}
    </div>
  );
}
