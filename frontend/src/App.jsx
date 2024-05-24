import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/sign-up' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
