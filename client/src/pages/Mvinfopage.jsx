import React, { useEffect, useState } from 'react'
import "./../pages/mvinfopage.css"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { SeriesGrid, SeriesRecGrid, useWindowSize } from './HomePage';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};


export const Mvinfopage = () => {
  const location = useLocation();
  const [width, height] = useWindowSize();
  const [data, setData] = useState(null);
  const [similarData, setSimilarData] = useState(null);


  // Check if location.state exists before destructuring
  const { isMovie, id } = location.state || {};

  let content = isMovie==="Movie"?"true":"false"

  const fetchData = async () => {
    try {
      const response2 = await axios.get(`http://localhost:3001/getdatabyid?id=${id}&ismovie=${content}`);
      setData(response2.data);
      const response = await axios.get(`http://localhost:3001/getsimilarsbyid?id=${id}&ismovie=${content}`);
      setSimilarData(response.data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    if (id && isMovie !== undefined ) {
  
      fetchData();
    }
  }, [id, isMovie, content]);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Rest of your component rendering logic
  return (
    <div className='mvinfopage'>
      <div className="mvlayout">
        <div className="mvHposterdiv">
          <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} className="mvHposter" alt="" />
        </div>

        <div className="mvVposterdiv">
        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className="mvVposter" alt="" />
        </div>

        <div className="carmvdesc2">
        <div className="carmvname2" style={
          {
            fontSize:`${(width/height)<=1?"40px":"50px"}`,
            left:`${(width/height)<=1?"10px":"300px"}`,
            width:`${(width/height)<=1?"100%":"69%"}`,
        }
          }>
        {content==="true"?data.title:data.name}
      </div>
        </div>

      </div>
      <div className="info">
        {data.overview}
        <MovieInfoGrid movieData={data} content={content} className="mvinfogrid"/>
      </div>

      <div className="recommendationdiv">
      <div className="carmvname3" style={
          {
            fontSize:`${(width/height)<=1?"25px":"35px"}`,
            padding:'20px',
            // left:`${(width/height)<=1?"10px":"300px"}`,
            // width:`${(width/height)<=1?"100%":"69%"}`,
        }
          }>
       <strong>You might also like</strong>
      </div>   

      <div className="recgrid">
        {/* {similarData} */}
  {similarData ? <SeriesRecGrid seriesData={similarData}/> : <div>Loading similar movies...</div>}
  {/* {similarData ? similarData : <div>Loading similar movies...</div>} */}
</div>
      </div>
    </div>
  );
}







const formatVotes = (votes) => {
  return votes > 1000 ? `${(votes / 1000).toFixed(1)}k` : votes.toString();
};
const formatRating = (rating) => rating.toFixed(1);




const MovieInfoGrid = ({ movieData, content }) => {
  return (
    <div className="movie-info-grid">
      {content === "true" ? (
        <>
          <div className="grid-item"><strong>Released:</strong> {movieData.release_date || "N/A"}</div>
          <div className="grid-item"><strong>Genre:</strong> {movieData.genres ? movieData.genres.map(genre => genre.name).join(", ") : "N/A"}</div>
          <div className="grid-item"><strong>Duration:</strong> {movieData.runtime || "N/A"} min</div>
          <div className="grid-item"><strong>Rating:</strong> {movieData.vote_average ? formatRating(movieData.vote_average) : "N/A"} ({movieData.vote_count ? formatVotes(movieData.vote_count) : "0"} votes)</div>
          <div className="grid-item"><strong>Country:</strong> {movieData.production_countries ? movieData.production_countries.map(country => country.name).join(", ") : "N/A"}</div>
          <div className="grid-item"><strong>Production:</strong> {movieData.production_companies ? movieData.production_companies.map(company => company.name).join(", ") : "N/A"}</div>
        </>
      ) : (
        <>
          <div className="grid-item"><strong>Released:</strong> {movieData.first_air_date || "N/A"}</div>
          <div className="grid-item"><strong>Genre:</strong> {movieData.genres ? movieData.genres.map(genre => genre.name).join(", ") : "N/A"}</div>
          <div className="grid-item"><strong>Episode duration:</strong> {movieData.episode_run_time ? movieData.episode_run_time.join(", ") : "N/A"} min</div>
          <div className="grid-item"><strong>Network:</strong> {movieData.networks ? movieData.networks.map(network => network.name).join(", ") : "N/A"}</div>
          <div className="grid-item"><strong>Rating:</strong> {movieData.vote_average ? formatRating(movieData.vote_average) : "N/A"} ({movieData.vote_count ? formatVotes(movieData.vote_count) : "0"} votes)</div>
          <div className="grid-item"><strong>Country:</strong> {movieData.origin_country ? movieData.origin_country.join(", ") : "N/A"}</div>
          <div className="grid-item"><strong>Production:</strong> {movieData.production_companies ? movieData.production_companies.map(company => company.name).join(", ") : "N/A"}</div>
        </>
      )}
    </div>
  );
};
