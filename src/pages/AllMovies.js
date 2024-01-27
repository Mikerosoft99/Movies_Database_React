import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AllMovies() {
    const [movies, setMovies] = useState([]);
    const [Search, setSearch] = useState('');
    const [currentList, setCurrentList] = useState('now_playing'); // Default to 'now_playing'

    const apiKey = '8905e08e3a3707818f8ff36e0dc4df18';

    const getMovies = (url) => {
        axios.get(url)
            .then(response => {
                setMovies(response.data.results);
                console.log(response.data.results);
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

    const handleSearch = () => {
        const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${Search}`;
        getMovies(searchUrl);
    };

    const handleListChange = (list) => {
        setCurrentList(list);
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
                            className="mx-3"
                        />
                        <Button variant="outline-primary" onClick={handleSearch}>
                            <b>Search</b>
                        </Button>
                    </Col>
                </Row>
                <Row>
                    {movies.map(movie => (
                        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                                <Card className='movie-card' style={{ marginBottom: '20px' }}>
                                    <Card.Img
                                        variant="top"
                                        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `${process.env.PUBLIC_URL}/movie-poster-notfound.jpg`}
                                        alt={movie.title}
                                    />
                                    <Card.Body>
                                        <Card.Title>{movie.title}</Card.Title>
                                        <Card.Title>{movie.genre}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default AllMovies;
