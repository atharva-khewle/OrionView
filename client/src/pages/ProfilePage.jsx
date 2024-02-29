import React, { useEffect, useRef, useState } from "react";
import "./ProfilePage.css";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MyListItem } from "./MediaClasses";
import axios from "axios";

class ShowData {
  constructor(title, type, status, episodesWatched, isFavorite) {
    this.title = title;
    this.type = type;
    this.status = status;
    this.episodesWatched = episodesWatched;
    this.isFavorite = isFavorite;
  }
}

const fetchDataByID = async (id, isMovie) => {
  try {
    // Make Axios API request
    const response = await axios.get('http://localhost:3001/getdatabyid', {
      params: {
        id: id,
        ismovie: isMovie // Assuming 'ismovie' is the correct parameter name
      }
    });

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle errors
    console.error('Error fetching data by ID:', error);
    throw error; // Throw the error for handling elsewhere
  }
};



const fetchListData = async (token) => {
  try {
    console.log("token : ", token)

  const response = await axios.post('http://localhost:3001/getUserShowsList', {  },
   {
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


const fetchUsername = async (token) => {
  try {
    console.log("token : ", token)

  const response = await axios.post('http://localhost:3001/getUserInfoRouter', {  },
   {
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







export const ProfilePage = () => {
  const [category, setCategory] = useState('all');
  const [status, setStatus] = useState('all');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const imgUploadRef = useRef(null);
  const [cookies, setCookie] = useCookies(['token', 'userID']);
  const navigate = useNavigate();
  // const [items, setItems] = useState([]);
  const cookiess = new Cookies();
  const [showDataList, setShowDataList] = useState([]); // State to store the ShowData list
  const [filteredData, setFilteredData] = useState([]); // State to store filtered data


 


  
  useEffect(() => {
    // setItems(generateFakeData(9));

    if (cookies.token) {
      console.log('Token is available in cookies');
      // Perform actions based on the existence of token and userId
    } else {
      console.log('Token is not found in cookies');
      // Handle the absence of token and userId
      navigate("/login")
    }

    fetchListData(cookies.token)
    .then(data => {
      // Create ShowData objects and store them in the list
      const newData = data.data.map(item => new ShowData(
        item.title,
        item.type,
        item.status,
        item.episodesWatched,
        item.isFavorite
      ));
      setShowDataList(newData);
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
    });


    ///////////////////////////////////////////////////
    fetchUsername(cookies.token)
    .then(data => {
      console.log(data.username)
      setImage(data.image)
      setUsername(data.username)
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
    });



  }, [cookies.token]);
  

  
  
  useEffect(() => {
    // Filter data based on category, status, and favorites
    let filtered = showDataList.filter(item => {
      // Check if the item matches the selected category
      if (category !== 'all' && item.type !== category) {
        return false;
      }
      // Check if the item matches the selected status
      if (status !== 'all' && status !== 'favorite' && item.status !== status) {
        return false;
      }
      // Check if the item is marked as favorite
      if (status === 'favorite' && !item.isFavorite) {
        return false;
      }
      return true;
    });
    setFilteredData(filtered);
  }, [showDataList, category, status]);

  

  const logoutfn =()=>{
    // cookiess.remove("userID");
    cookiess.remove("token");
  }


  const updateImage = async () => {  
    try {
      console.log("worked fine 1")
      const response = await axios.post('http://localhost:3001/updateUserImage', {
        "imgbit":image
      }, {
        headers: {
          Authorization: `${cookies.token}` // Sending token in Authorization header
        }
      });
      console.log("worked fine 2")
      console.log(response.data); // Log the response from the backend
  
    } catch (error) {
      console.error('Error updating listuwuuuu:', error);
    }
  };
  


  const convertToBase64=(e)=>{
    var reader= new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.onload=()=>{
      console.log(reader.result)
      setImage(reader.result)
    }
    reader.onerror = error=>{
      console.log("Converting Image Error UwU :",error)
    }
  }

  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleImgClick=()=>{
    if (imgUploadRef.current) {
      imgUploadRef.current.style.display = 'flex'
    }
  }

  const handleCloseClick = () => {
    // Handle close button click event
    if (imgUploadRef.current) {
      imgUploadRef.current.style.display = 'none';
    }
  };

  const handleUploadClick = () => {
    if(image==='' || image===null || image=="0"){
    }else{
      console.log(image)
      updateImage()
    }
    if (imgUploadRef.current) {
      imgUploadRef.current.style.display = 'none';
    }

  };


  return (
    <div className="pfplayout">
      <div className="logout" onClick={logoutfn}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path fill="#ffffff" d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/></svg>
      </div>
      <div className="pfp">
        <img
          src={image==="0" || image==""||image==null?"https://picsum.photos/800/400":image}
          alt=""
          onClick={handleImgClick}
          className="pfplinkbox"
        />
        <img
          src={image==="0" || image==""||image==null?"https://picsum.photos/800/400":image}
          alt="" className="blurimg" />
      </div>
      <div className="uploadimgdiv" ref={imgUploadRef}>
        <input 
        accept="image/"
        type="file" 
        onChange={convertToBase64}
        />
        <div style={{marginTop:"0px"}}>
        <button className={`btn btn-primary imgbutton`} onClick={handleUploadClick}>Upload</button>
        <button className={`btn btn-secondary imgbutton `} onClick={handleCloseClick}> X </button>
        </div>
      </div>
      <div className="name">
        <strong>{username}</strong>
      </div>

      <div className="mylistdiv">
        <div className="selectMyList">
        <form>
            <select name="category" id="category" value={category} onChange={handleCategoryChange}>
              <option value="all">All</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
            </select>

            <select name="status" id="status" value={status} onChange={handleStatusChange}>
              <option value="all">All</option>
              <option value="favorite">Favourite</option>
              <option value="watching">Watching</option>
              <option value="completed">Completed</option>
              <option value="wishlist">Wishlist</option>
              <option value="none">None</option>
            </select>
          </form>
        </div>
        <div className="mylist" >

        {/* {showDataList.map((item) => (
  <ChildComponent key={item.title} item={item} />
))} */}
        {filteredData.map((item) => (
          <ChildComponent key={item.title} item={item} />
        ))}

  

        </div>
      </div>
    </div>
  );
};

// function generateFakeData(numItems = 9) {
//   const fakeData = [];
//   for (let i = 0; i < numItems; i++) {
//     fakeData.push(new MyListItem(
//       i, 
//       `Name ${i}`,
//       Math.random() < 0.5,
//       ['Airing', 'Finished', 'Planned'][Math.floor(Math.random() * 3)],
//       Math.floor(Math.random() * 10),
//       Math.floor(Math.random() * 100),
//       Math.floor(Math.random() * 50),
//       `${Math.floor(Math.random() * 180) + 60} min`,
//       `imgPathFile${i}.jpg`
//     ));
//   }
//   return fakeData;
// }
function generateRandomSoftColor() {
  // const hue = Math.floor(Math.random() * 360);
  // const saturation = Math.floor(Math.random() * 30) + 70;
  // const lightness = Math.floor(Math.random() * 20) + 40; 
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 60; // Increase range from 60% to 100%
  const lightness = Math.floor(Math.random() * 30) + 35; // Increase range from 35% to 65%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}



const ChildComponent = ({ item }) => {
  const [imgUrl, setImgUrl] = useState('');
  const [title,setTitle] = useState('')
  const [eps,seteps] = useState('')
  const [season,setseason]= useState('')
  const[runtime,setruntime]=useState('')
  const[epruntime,setepruntime]=useState('')
  const fallbackUrl = './../../assets/notfound2.png';
  const [color, setColor] = React.useState(generateRandomSoftColor());
const navigate = useNavigate();
  

const handleNavigate = (seriesId, isMovieParam) => {
  navigate(`/mvinfo`, { state: { isMovie: isMovieParam, id: seriesId } });
  scrollToTop()
};

  useEffect(() => {
    fetchDataByID(item.title, item.type === "movie")
      .then(data => {
        const path = data.poster_path;
        const url = path ? `https://image.tmdb.org/t/p/w500${path}` : fallbackUrl;
        setImgUrl(url);
        // console.log(data.number_of_episodes)
        seteps(data.number_of_episodes)
        // console.log(data.number_of_seasons)
        setseason(data.number_of_seasons)
        setruntime(data.runtime)
        setepruntime(data.episode_run_time)
        setTitle(item.type==="movie"?data.title:data.name)
      })
      .catch(() => setImgUrl(fallbackUrl)); // Fallback in case of error
  }, [item.title, item.type]);

  return (
    <div className="borderdiv" onClick={() => handleNavigate(item.title,item.type !== "series"?"Movie":"TV")}>
      <div className="myitem">
        <img src={imgUrl} onError={(e) => e.target.src = fallbackUrl} alt={item.title || 'Image not available'} className="myitemimg" />
        <div className="mvinfos">
          <div className="mvinfosName oneside">
            <div className="two">
            {title}
            <div className="heart"  onClick={()=>{}}>
              {
                !item.isFavorite?
                <div >
            {/* <svg xmlns="http://www.w3.org/2000/svg" height="22" width="22" viewBox="0 0 512 512"> */}
            {/* <path fill="#FFD43B" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg> */}
            {/* <path fill={`${color}`} d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg> */}
                </div>
              :
              <div>
            <svg xmlns="http://www.w3.org/2000/svg" height="19" width="19" viewBox="0 0 512 512">
            <path fill={`${color}`} d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>
              </div>
              }
            

            </div>
            </div>
            <div className="poiu strongtxt">          
            {item.type === "series" && (
            <React.Fragment>
              <div className="mvtime">
                <strong className="strongtxt">S</strong> {season}
              </div>
              <div className="mvtime">
              <strong className="strongtxt">EP</strong> {eps}
              </div>
            </React.Fragment>
          )}</div>
          </div>
        <div className="mvinfosContent">
          <div style={{
            color: item.status === "watching" ? "green" :
                   item.status === "completed" ? "lightskyblue" :
                   "yellow"
          }
          }>
            {item.status}
            
          </div>
          <div className="poiu">
          <div className="mvtime">
            {item.type === "movie" ? `${runtime} min` : ` ${epruntime} min/eps`}
          </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

