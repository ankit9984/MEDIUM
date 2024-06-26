import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NewStory from './pages/NewStory';
import YourStories from './pages/YourStories';
import HomePageDeatils from './pages/HomePageDeatils';
import AuthorPostPage from './pages/AuthorPostPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/sign-up' element={<RegisterPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route>
            <Route path='/' element={<HomePage />} />
            <Route path='/new-story' element={<NewStory />} />
            <Route path='/me/stories' element={<YourStories />}>
              <Route path=':tabName' element={<YourStories />} />
            </Route>
            <Route path='/:author/:title' element={<HomePageDeatils />} />
            <Route path='/:username' element={<AuthorPostPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
