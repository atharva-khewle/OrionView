import axios from "axios";
import "./LoginPage.css";
import React, { useEffect, useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  
  const [showLogin, setShowLogin] = useState(true);
  const [loginDetails, setLoginDetails] = useState({ username: '', password: '' });
  const [registerDetails, setRegisterDetails] = useState({ username: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['token', 'userId']);
  const navigate = useNavigate();






  useEffect(() => {
    if (cookies.token && cookies.userId) {
      console.log('Token and UserId are available in cookies');
      // Perform actions based on the existence of token and userId
      navigate("/profile")

    } else {
      console.log('Token or UserId not found in cookies');
      // Handle the absence of token and userId
    }
  }, [cookies.token, cookies.userId]);
  








  const handleLoginChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };



  const handleRegisterChange = (e) => {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  };















  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        username: loginDetails.username,
        password: loginDetails.password
      });
      // Save token and userId in cookies
      setCookie('token', response.data.token, { path: '/', maxAge: 3600 * 24 * 7 }); // Expires in 7 days
      setCookie('userId', response.data.userId, { path: '/', maxAge: 3600 * 24 * 7 });
      console.log('Login response:', response.data);
    } catch (error) {
      setError('Login failed');
      console.error('Error during login:', error);
    }
  };


















  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3001/auth/register', {
        username: registerDetails.username,
        password: registerDetails.password
      });
      // Save token and userId in cookies after registration
      setCookie('token', response.data.token, { path: '/', maxAge: 3600 * 24 * 7 }); // Expires in 7 days
      setCookie('userId', response.data.userId, { path: '/', maxAge: 3600 * 24 * 7 });
      console.log('Register response:', response.data);
    } catch (error) {
      setError('Registration failed');
      console.error('Error during registration:', error);
    }
  };



















  return (
    <div className="loginlayout">
      <div className="formlayout">
        <strong className="logintext mb-14"><h3>{showLogin ? "Login" : "Register"}</h3></strong>
        {showLogin ? (
          <div>
            <form className='loginform' onSubmit={handleLoginSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label">Username</label>
                <input type="text" name="username" className="form-control" onChange={handleLoginChange} />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleLoginChange} />
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
            </form>
            <p>Not a member? <button onClick={() => setShowLogin(false)}><a href="#!">Register</a></button></p>
          </div>
        ) : (
          <div>
            <form className='registerform' onSubmit={handleRegisterSubmit}>
              <div className="form-outline mb-4">
                <label className="form-label">Username</label>
                <input type="text" name="username" className="form-control" onChange={handleRegisterChange} />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Password</label>
                <input type="password" name="password" className="form-control" onChange={handleRegisterChange} />
              </div>

              <div className="form-outline mb-4">
                <label className="form-label">Confirm Password</label>
                <input type="password" name="confirmPassword" className="form-control" onChange={handleRegisterChange} />
              </div>

              <button type="submit" className="btn btn-primary btn-block mb-4">Register</button>
            </form>
            <p>Already a member? <button onClick={() => setShowLogin(true)}><a href="#!">Sign in</a></button></p>
          </div>
        )}
      </div>
    </div>
  );
};
