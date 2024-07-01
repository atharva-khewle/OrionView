import React, { useEffect, useState } from 'react'
import "./../pages/mvinfopage.css"
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SeriesGrid, SeriesRecGrid, useWindowSize } from './HomePage';
import Cookies from 'js-cookie';
import { useCookies } from 'react-cookie';
import { currentHost } from '../App';




const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
function generateRandomSoftColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 60; // Increase range from 60% to 100%
  const lightness = Math.floor(Math.random() * 30) + 35; // Increase range from 35% to 65%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

const fetchMovieData = async (movieId, token) => {
  try {
    console.log("id : ", movieId)
    console.log("token : ", token)

  const response = await axios.post(`http://${currentHost}:3001/getsavedmovieidbyuserid`, {
    movieId: movieId
  }, {
    headers: {
      Authorization: `${token}` // Sending token in Authorization header
    }
  });




    return response.data;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
};

export const Mvinfopage = () => {
  const location = useLocation();
  const [width, height] = useWindowSize();
  const [data, setData] = useState(null);
  // const [ImdbId, setImdbId] = useState("");
  const [similarData, setSimilarData] = useState(null);
  const [isliked,setisliked] = useState(false);
  const [status, setStatus] = useState('none');
  const [color, setColor] = React.useState(generateRandomSoftColor());
  const [token, setToken] = useState('');
  const [cookies, setCookie] = useCookies(['ismovie', 'playid']);
  const navigate = useNavigate();
  





  // Check if location.state exists before destructuring
  const { isMovie, id } = location.state || {};

  let content = isMovie==="Movie"?"true":"false"

  const fetchData = async () => {
    try {
      const response2 = await axios.get(`http://${currentHost}:3001/getdatabyid?id=${id}&ismovie=${content}`);
      setData(response2.data);

      const response = await axios.get(`http://${currentHost}:3001/getsimilarsbyid?id=${id}&ismovie=${content}`);
      setSimilarData(response.data.results);

      // const response3 = await axios.get(`http://${currentHost}:3001/getImdbIdbyTmdbId?id=${id}&movie=${content}`);
      // const imdbIdd = response3.data.imdbId; // Assuming the response has a field named 'imdbId'
      // setImdbId(imdbIdd);
      // console.log(imdbIdd)
  
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
    setisliked(false);
    setStatus('none');

   setToken(Cookies.get('token'));

    if (id && isMovie !== undefined ) {
      fetchData();



      
fetchMovieData(id, Cookies.get('token'))
.then(data => {
  console.log('Movie data:', data.data.isFavorite);
  if(data.success===false){
    setisliked(false);
    setStatus('none');
  }else{
    setisliked(data.data.isFavorite);
    setStatus(data.data.status);
  }
})
.catch(error => {
  console.error('Error UwU:', error);
});

    }

  }, [id, isMovie, content]);



  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      const response = await axios.post(`http://${currentHost}:3001/updateList`, {
        movieData: {
          title: id,
          type: content === 'true' ? 'movie' : 'series',
          status: newStatus,
          episodesWatched: data.episode_watch_count || 0, // Assuming you have 'episode_watch_count' in your data
          isFavorite: isliked
        }
      }, {
        headers: {
          Authorization: `${token}` // Sending token in Authorization header
        }
      });
      console.log(response.data); // Log the response from the backend

    } catch (error) {
      console.error('Error updating list:', error);
    }
  };
  

  const handleLikeToggle = async () => {

    setisliked(!isliked);
    //isnt updated so directly updated value
    console.log(!isliked)

    try {
      const response = await axios.post(`http://${currentHost}:3001/updateList`, {
        movieData: {
          title: id,
          type: content === 'true' ? 'movie' : 'series',
          status,
          episodesWatched: data.episode_watch_count || 0, // Assuming you have 'episode_watch_count' in your data
          isFavorite: !isliked // Toggle the value
        }
      }, {
        headers: {
          Authorization: `${token}` // Sending token in Authorization header
        }
      });
      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const handlePageChange = async()=>{
    setisliked(false);
    setStatus('none');
  }



   const gotoplay= ()=>{
    console.log("hiiiiii")
    setCookie('ismv',isMovie==="Movie"?"true":"false")
    setCookie('playid',id)
    navigate(`/mvplay`, { state: { id: id } });
  }


  // const handleStatusChange = (event) => {
  //   setStatus(event.target.value);
  //   //there is delay so i am not using status
  //   console.log('Selected option:', event.target.value);
  //   // Add additional logic if needed, like submitting the value
  // };

  if (!data) {
    return <div>Loading...</div>;
  }

  // Rest of your component rendering logic
  return (
    <div className='mvinfopage'>
      <div className="mvlayout">
        <div className="mvHposterdiv" onClick={gotoplay}>
          <img src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`} 
          className="mvHposter" alt="" onClick={
            ()=>gotoplay()
        } />
        </div>

        <div className="mvVposterdiv">
        <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} className="mvVposter" alt="" onClick={gotoplay}/>
        </div>

        <div className="carmvdesc2">
        <div className="carmvname2" style={
          {
            fontSize:`${(width/height)<=1?"40px":"50px"}`,
            left:`${(width/height)<=1?"10px":"300px"}`,
            width:`${(width/height)<=1?"100%":"69%"}`,
        }
          }>



        <div className='mvname2'>
        {content==="true"?data.title:data.name}

        </div>
      </div>

        </div>


      </div>
      <div className="info">
      <div className='userselect'style={
          {
            // fontSize:`${(width/height)<=1?"40px":"50px"}`,
            left:`${(width/height)<=1?"10px":"300px"}`,
            justifyContent:`${(width/height)>1?"start":"space-between"}`,
        }
          }>

          <select name="status" id="status" value={status} onChange={handleStatusChange} className='userselectoptions' style={
            {
            marginLeft:`${(width/height)>1?"49px":"0px"}`,
            }
          }>
              <option value="none">None</option>
              <option value="watching">Watching</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
              <option value="remove">Remove</option>
              {/* Add more options here as needed */}
            </select>

            <div className="heart"  onClick={handleLikeToggle}>
              {
                isliked===false?
                <div >
            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512">
            {/* <path fill="#FFD43B" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg> */}
            <path fill={`${color}`} d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
                </div>
              :
              <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512">
            <path fill={`${color}`} d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
              </div>
              }
            

            </div>
        </div>
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
  {similarData ? <SeriesRecGrid seriesData={similarData} /> : <div>Loading similar movies...</div>}
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
