import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/actions/ToggleFav';

function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [Search, setSearch] = useState('');
    const [currentList, setCurrentList] = useState('popular');

    const dispatch = useDispatch();
    const favoritesArr = useSelector((state) => state.favorites.favorites);

    const apiKey = '8905e08e3a3707818f8ff36e0dc4df18';

    const getMovies = (url) => {
        axios.get(url)
            .then(response => {
                setMovies(response.data.results);
                // console.log(response.data.results);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    // For Movies List Changing
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${currentList}?api_key=${apiKey}`;
        getMovies(url);
    }, [currentList]);

    const handleListChange = (list) => {
        setCurrentList(list);
    };

    // For Searching
    const handleSearch = () => {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${Search}`;
        getMovies(searchUrl);
    };

    return (
        <div>
            <h1 className='my-3 text-center allmovies-title'>Movies List: {currentList.replace('_', ' ')}</h1>

            <Container fluid>
                <Row className="text-center justify-content-center my-3">
                    <div>
                        <Button className='mx-2' variant="primary" onClick={() => handleListChange('popular')}>Popular</Button>
                        <Button className='mx-2' variant="primary" onClick={() => handleListChange('now_playing')}>Now Playing</Button>
                        <Button className='mx-2' variant="primary" onClick={() => handleListChange('top_rated')}>Top Rated</Button>
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
                            <Card className='movie-card' style={{ marginBottom: '20px' }}>
                                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <Card.Img
                                        variant="top"
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `${process.env.PUBLIC_URL}/movie-poster-notfound.jpg`}
                                        alt={movie.title}
                                    />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Button
                                        variant="outline-info"
                                        onClick={() =>
                                            favoritesArr.some((favMovie) => favMovie.id === movie.id)
                                                ? dispatch(removeFromFavorites(movie.id))
                                                : dispatch(addToFavorites({ id: movie.id, poster_path: movie.poster_path, original_title: movie.original_title }))
                                        }
                                    >
                                        {favoritesArr.some((favMovie) => favMovie.id === movie.id)
                                            ? 'Remove from Favorites'
                                            : 'Add to Favorites'}
                                    </Button>
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
