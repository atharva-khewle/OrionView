import { useState , useEffect, useRef} from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes, useLocation} from "react-router-dom"
import { StartPage } from './pages/StartPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { SearchPage } from './pages/SearchPage'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Mvinfopage } from './pages/Mvinfopage'
import { Cookies, useCookies } from "react-cookie";
import axios from 'axios'
import { MoviePlay } from './pages/MoviePlay'
import MagicContainer from './pages/MagicContainer'
// import {  faBars} from "@fortawesome/free-solid-svg-icons";
// import {} from "@tre"

export const currentHost="https://orionview-2.onrender.com";

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


const fetchUsername = async (token) => {
  try {
    console.log("token : ", token)

  const response = await axios.post(`${currentHost}/getUserInfoRouter`, {  },
   {
    headers: {
      Authorization: `${token}` // Sending token in Authorization header
    }
  });

    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};









function App() {
  const [cookies, setCookie] = useCookies();
  const [width, height] = useWindowSize();

    return (
  <div className='canvas'>
    <div>
  <Router>
        <NavBar />

      <div className='centerpageview'>
      <div className="pageview">
      <Routes>
      <Route path="/" element={ <HomePage/>} />
      <Route path="/home" element={ <HomePage/>} />
      <Route path="/register" element={ <RegisterPage/>} />
      <Route path="/login" element={ <LoginPage/>} />
      <Route path="/search" element={ <SearchPage/>} />
      <Route path="/profile" element={ <ProfilePage/>} />
      <Route path="/mvinfo" element={ <Mvinfopage/>} />
      <Route path="/mvplay" element={ <MoviePlay/>} />
    </Routes>
      </div>
      </div>
      <Footer/>
      {
        cookies.code_word===undefined?
      <MagicContainer></MagicContainer>
      :
      <div></div>
      }


  </Router>
  </div>

  </div>
  )
}


const Footer = () => {
  return (
    <div className="footerp">
      <div className="footer-icons">
        <a href="https://github.com/atharva-khewle" className="footer-icon" target="_blank">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/github.png" alt="GitHub" />
        </a>
        <a href="https://www.linkedin.com/in/atharvakhewle" className="footer-icon" target="_blank">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" alt="LinkedIn" />
        </a>
        <a href="https://www.instagram.com/atharva_work/" className="footer-icon" target="_blank">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" alt="Instagram" />
        </a>
        <a href="https://twitter.com/atharvamainwork" className="footer-icon" target="_blank">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/twitter.png" alt="Twitter" />
        </a>
      </div>
      <p className='footernote '>© 2024 Developed with MERN stack by <strong>Atharva Khewle </strong>.</p>
    </div>
  );
};




const NavBar= () => {
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const navlist = useRef();
  const [isNavListVisible, setIsNavListVisible] = useState(false);
  const [image, setImage] = useState('');
  const cookiess = new Cookies();
  const [cookies, setCookie] = useCookies(['token', 'userID']);



  const toggleNavList = () => {
    console.log("set")
    setIsNavListVisible(!isNavListVisible);
  };

  const navigateAndHideNavList = (path) => {
    navigate(path);
    setIsNavListVisible(false);
  };
  
    
  useEffect(() => {

    fetchUsername(cookies.token)
    .then(data => {
      console.log(data.username)
      setImage(data.image)
      // setUsername(data.username)
    })
    .catch(error => {
      console.error('Error fetching movie data:', error);
    });



  }, [cookies.token]);

  return (
    <div className='navcenterer ' >
      
    <div className='navbar'>

      <div className="navlogo" onClick={() => navigate('/home')}>
      <div class="box">
  <div class="text">OrionView</div>
  {/* in premium remove this  */}
  {/* <b></b> */}
</div>
      </div>
      {
        
        (width/height)<=0.6?
        <>
        <div className="navicon"  onClick={toggleNavList}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
        <path fill="#fbfcfd" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </div>
        <div className={`flex flex-col dropdownfile z-10 ${isNavListVisible ? 'visible' : 'hidden'}`} ref={navlist}>
        <div className='randomdiv1' onClick={() => navigateAndHideNavList('/profile')}>
                {cookies.token!==''||cookies.token!==null?
                <img 
                src={image==="0" || image==""||image==null?"https://picsum.photos/800/400":image}
                alt="" 
                className="navpfp"
                 />
              :
              Login/Register
              }
              </div>
          <div className="navvspace"></div>
          <div onClick={() => navigateAndHideNavList('/home')}>Home</div>
          <div className="navvspace"></div>
          <div onClick={() => navigateAndHideNavList('/search')}>Search</div>

        </div>
        </>
        :
      <div className='navbaritems'>
        <div className="navhome dist" onClick={() => navigate('/home')} >Home</div>
        <div className="navsearch dist" onClick={() => navigate('/search')}>Search</div>
        <div className="navprofile dist" onClick={() => navigate('/profile')}>
        {cookies.token?
                <img 
                src={image==="0" || image==""||image==null?"https://picsum.photos/800/400":image}
                alt="" 
                className="navpfp"
                 />
              :
              "Enter"
              }
        </div>
      </div>
      }


    </div>

    </div>
  )
}




export default App
