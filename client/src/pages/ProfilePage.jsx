import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [cookies, setCookie] = useCookies(['token', 'userId']);
  const navigate = useNavigate();

  


  
  useEffect(() => {
    if (cookies.token && cookies.userId) {
      console.log('Token and UserId are available in cookies');
      // Perform actions based on the existence of token and userId
    } else {
      console.log('Token or UserId not found in cookies');
      // Handle the absence of token and userId
      navigate("/login")

    }
  }, [cookies.token, cookies.userId]);
  




  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    // Add additional logic if needed, like submitting the value
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    // Add additional logic if needed, like submitting the value
  };

  return (
    <div className="pfplayout">
      <div className="pfp">
        <img
          src="https://picsum.photos/400/400"
          alt=""
          className="pfplinkbox"
        />
        <img src="https://picsum.photos/400/400" alt="" className="blurimg" />
      </div>
      <div className="name">
        <strong>{}</strong>
      </div>

      <div className="mylistdiv">
        <div className="selectMyList">
        <form>
            <select name="category" id="category" value={category} onChange={handleCategoryChange}>
              <option value="All">All</option>
              <option value="Movies">Movies</option>
              <option value="Series">Series</option>
            </select>

            <select name="status" id="status" value={status} onChange={handleStatusChange}>
              <option value="All">All</option>
              <option value="Watching">Watching</option>
              <option value="Completed">Completed</option>
              <option value="Wishlist">Wishlist</option>
              {/* Add more options here as needed */}
            </select>
          </form>
        </div>
      </div>
    </div>
  );
};
