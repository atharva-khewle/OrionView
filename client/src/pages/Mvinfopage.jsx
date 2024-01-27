import React, { useEffect, useState } from 'react'
import "./../pages/mvinfopage.css"
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useWindowSize } from './HomePage';

export const Mvinfopage = () => {
  const location = useLocation();
  const [width, height] = useWindowSize();
  const [data, setData] = useState(null);

  // Check if location.state exists before destructuring
  const { isMovie, id } = location.state || {};

  let content = isMovie==="Movie"?"true":"false"

  // useEffect(() => {
  //   // Only fetch data if id and isMovie are available
  //   // if (id && isMovie !== undefined) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(`http://localhost:3001/mvinfo?id=${id}&ismovie=${content}`);
  //         setData(response.data);
  //       } catch (error) {
  //         console.error('Error fetching data uuuuu:', error);
  //       }
  //     // };

  //     fetchData();
  //   }
  // }, [id, isMovie]);
  useEffect(() => {
    if (id && isMovie !== undefined) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/getdatabyid?id=${id}&ismovie=${content}`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
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
          <div className="grid-item"><strong>Released:</strong> {movieData.release_date}</div>
          <div className="grid-item"><strong>Genre:</strong> {movieData.genres.map(genre => genre.name).join(", ")}</div>
          {/* <div className="grid-item"><strong>Casts:</strong> {movieData.cast.join(", ")}</div> */}
          <div className="grid-item"><strong>Duration:</strong> {movieData.runtime} min</div>
          <div className="grid-item"><strong>Rating:</strong> {formatRating(movieData.vote_average)} ({formatVotes(movieData.vote_count)} votes)</div>
          <div className="grid-item"><strong>Country:</strong> {movieData.production_countries.map(country => country.name).join(", ")}</div>
          <div className="grid-item"><strong>Production:</strong> {movieData.production_companies.map(company => company.name).join(", ")}</div>
        </>
      ) : (
        <>
          <div className="grid-item"><strong>Released:</strong> {movieData.first_air_date}</div>
          <div className="grid-item"><strong>Genre:</strong> {movieData.genres.map(genre => genre.name).join(", ")}</div>
          {/* <div className="grid-item"><strong>Casts:</strong> {movieData.cast.join(", ")}</div> */}
          <div className="grid-item"><strong>Network:</strong> {movieData.networks.map(network => network.name).join(", ")}</div>
          <div className="grid-item"><strong>Rating:</strong> {formatRating(movieData.vote_average)} ({formatVotes(movieData.vote_count)} votes)</div>
          <div className="grid-item"><strong>Country:</strong> {movieData.origin_country.join(", ")}</div>
          <div className="grid-item"><strong>Production:</strong> {movieData.production_companies.map(company => company.name).join(", ")}</div>
        </>
      )}
    </div>
  );
};
