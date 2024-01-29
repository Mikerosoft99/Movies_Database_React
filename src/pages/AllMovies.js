import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/actions/ToggleFav';
import axiosInstance from '../store/actions/axiosInter';
import { fetchMoviesError, fetchMoviesSuccess } from '../store/actions/FetchMovies';
import { useLanguage } from '../context/LanguageContext';

function AllMovies() {
    const dispatch = useDispatch();
    const movies = useSelector((state) => state.movies.movies);
    const [Search, setSearch] = useState('');
    const [currentList, setCurrentList] = useState('popular');
    const { language } = useLanguage();
    const favoritesArr = useSelector((state) => state.favorites.favorites);
    const apiKey = '8905e08e3a3707818f8ff36e0dc4df18';

    // Function to fetch movies from the API
    const getMovies = (url) => {
        dispatch(fetchMoviesError(null)); // Clear previous errors
        axiosInstance.get(url)
            .then(response => {
                dispatch(fetchMoviesSuccess(response.data.results));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                dispatch(fetchMoviesError(error.message));
            });
    };

    // Fetch movies on initial load and when language or currentList changes
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${currentList}?language=${language}&api_key=${apiKey}`;
        getMovies(url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentList, language]);

    // Fetch movies when searching or when language or currentList changes
    useEffect(() => {
        const url = Search
            ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${Search}`
            : `https://api.themoviedb.org/3/movie/${currentList}?language=${language}&api_key=${apiKey}`;
        getMovies(url);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentList, language, Search]);

    const handleSearch = () => {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${Search}&page=1`;
        getMovies(url);
    };

    return (
        <div>
            <h1 className='my-3 text-center allmovies-title'>Movies List: {currentList.replace('_', ' ')}</h1>

            <Container fluid>
                <Row className="text-center justify-content-center my-3">
                    <div>
                        <Button className='mx-2' variant="primary" onClick={() => setCurrentList('popular')}>Popular</Button>
                        <Button className='mx-2' variant="primary" onClick={() => setCurrentList('now_playing')}>Now Playing</Button>
                        <Button className='mx-2' variant="primary" onClick={() => setCurrentList('top_rated')}>Top Rated</Button>
                    </div>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6} lg={4} className="mb-3 d-flex align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Search for movies..."
                            value={Search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="mx-3 custom-input-dark"
                        />
                        <Button variant="outline-primary" onClick={handleSearch}>
                            <b>Search</b>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {movies.map((movie) => (
                        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card className='movie-card' style={{ marginBottom: '20px', position: 'relative' }}>
                                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                                    <Card.Img
                                        variant="top"
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `${process.env.PUBLIC_URL}/movie-poster-notfound.jpg`}
                                        alt={movie.title}
                                    />
                                </Link>
                                <div className="favorites-icon">
                                    <i
                                        className={`fas fa-heart${favoritesArr.some((favMovie) => favMovie.id === movie.id) ? ' text-danger' : '-broken text-danger'}`}
                                        style={{ cursor: 'pointer', position: 'absolute', top: '15px', right: '15px', fontSize: '2rem' }}
                                        onClick={() =>
                                            favoritesArr.some((favMovie) => favMovie.id === movie.id)
                                                ? dispatch(removeFromFavorites(movie.id))
                                                : dispatch(addToFavorites({ id: movie.id, poster_path: movie.poster_path, original_title: movie.original_title }))
                                        }
                                    ></i>
                                </div>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default AllMovies;
