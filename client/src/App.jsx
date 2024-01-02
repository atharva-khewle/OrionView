import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes} from "react-router-dom"
import { StartPage } from './pages/StartPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'

function App() {

  return (
  <>
  <Router>
    <Routes>
      <Route path="/" element={ <StartPage/>} />
      <Route path="/register" element={ <RegisterPage/>} />
      <Route path="/login" element={ <LoginPage/>} />
    </Routes>
  </Router>

  </>
  )
}

export default App
