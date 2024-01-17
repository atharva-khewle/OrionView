import { useState , useEffect, useRef} from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { StartPage } from './pages/StartPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import { SearchPage } from './pages/SearchPage'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {  faBars} from "@fortawesome/free-solid-svg-icons";
// import {} from "@tre"


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




function App() {
  const [width, height] = useWindowSize();

  return (
  <div className='canvas'>
    <div>
  <Router>
        <NavBar/>
      <div className='centerpageview'>
      <div className="pageview">
      <Routes>
      <Route path="/" element={ <StartPage/>} />
      <Route path="/register" element={ <RegisterPage/>} />
      <Route path="/login" element={ <LoginPage/>} />
      <Route path="/home" element={ <HomePage/>} />
      <Route path="/search" element={ <SearchPage/>} />
      <Route path="/profile" element={ <ProfilePage/>} />
    </Routes>
      </div>
      </div>

  </Router>
  </div>

  </div>
  )
}


const NavBar= () => {
  const navigate = useNavigate();
  const [width, height] = useWindowSize();
  const navlist = useRef();
  const [isNavListVisible, setIsNavListVisible] = useState(false);

  const toggleNavList = () => {
    console.log("set")
    setIsNavListVisible(!isNavListVisible);
  };

  const navigateAndHideNavList = (path) => {
    navigate(path);
    setIsNavListVisible(false);
  };

  return (
    <div className='navcenterer'>
      
    <div className='navbar'>

      <div className="navlogo">OrionView</div>
      {
        (width/height)<=0.6?
        <>
        <div className="navicon"  onClick={toggleNavList}>
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
        <path fill="#fbfcfd" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </div>
        <div className={`flex flex-col dropdownfile ${isNavListVisible ? 'visible' : 'hidden'}`} ref={navlist}>
          <div onClick={() => navigateAndHideNavList('/home')}>Home</div>
          <div className="navvspace"></div>
          <div onClick={() => navigateAndHideNavList('/search')}>Search</div>
          <div className="navvspace"></div>
              <div onClick={() => navigateAndHideNavList('/profile')}>Profile</div>
        </div>
        </>
        :
      <div className='navbaritems'>
        <div className="navhome" onClick={() => navigate('/home')} >Home</div>
        <div className="navsearch" onClick={() => navigate('/search')}>Search</div>
        <div className="navprofile" onClick={() => navigate('/profile')}>Profile</div>
      </div>
      }


    </div>

    </div>
  )
}


export default App