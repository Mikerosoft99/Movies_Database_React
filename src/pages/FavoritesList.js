import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row, Button, Container } from 'react-bootstrap';
import { removeFromFavorites } from '../store/actions/ToggleFav';

const FavoritesList = () => {
    const dispatch = useDispatch();
    const favoritesArr = useSelector((state) => state.favorites?.favorites || []);

    const removeFromFavoritesHandler = (movieId) => {
        dispatch(removeFromFavorites(movieId));
    };

    return (
        <Container fluid>
            <h1 className='my-3 text-center allmovies-title'>Favorites List</h1>

            {favoritesArr.length === 0 ? (
                <h1 className='text-center text-danger mt-5'>You haven't added any movie to your favorites yet.</h1>
            ) : (
                <Row>
                    {favoritesArr.map((movie) => (
                        <Col key={movie.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                            <Card className='movie-card' style={{ marginBottom: '20px' }}>
                                <Card.Img
                                    variant="top"
                                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Button
                                        variant="outline-danger"
                                        onClick={() => removeFromFavoritesHandler(movie.id)}
                                    >
                                        Remove from Favorites
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default FavoritesList;
