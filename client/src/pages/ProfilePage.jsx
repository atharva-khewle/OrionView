import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { MyListItem } from "./MediaClasses";

export const ProfilePage = () => {
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [cookies, setCookie] = useCookies(['token', 'userId']);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  


  
  useEffect(() => {
    setItems(generateFakeData(9));
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
              <option value="Dropped">Dropped</option>
              {/* Add more options here as needed */}
            </select>
          </form>
        </div>
        <div className="mylist" >

        {items.map(item => (
          <div className="borderdiv">

        <div key={item.id} className="myitem">
          <img src="https://picsum.photos/400/400" alt="" className="myitemimg" />
          </div>
        </div>
      ))}          

        </div>
      </div>
    </div>
  );
};

function generateFakeData(numItems = 9) {
  const fakeData = [];
  for (let i = 0; i < numItems; i++) {
    fakeData.push(new MyListItem(
      i, 
      `Name ${i}`,
      Math.random() < 0.5,
      ['Airing', 'Finished', 'Planned'][Math.floor(Math.random() * 3)],
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 100),
      Math.floor(Math.random() * 50),
      `${Math.floor(Math.random() * 180) + 60} min`,
      `imgPathFile${i}.jpg`
    ));
  }
  return fakeData;
}

