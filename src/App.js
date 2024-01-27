import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import AllMovies from './pages/AllMovies';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './pages/PageNotFound';
import RegistrationForm from './pages/RegistrationForm';
import LoginForm from './pages/LoginForm';
import Movie from './components/Movie';

function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<AllMovies />} />
          <Route path="/movies/:movieId" element={<Movie />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
