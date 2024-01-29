import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Row, Container } from 'react-bootstrap';
import { removeFromFavorites } from '../store/actions/ToggleFav';
import { Link } from 'react-router-dom';

const FavoritesList = () => {
    const dispatch = useDispatch();
    const favoritesArr = useSelector((state) => state.favorites?.favorites || []);

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
                                <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
                                    <Card.Img
                                        variant="top"
                                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                        alt={movie.original_title}
                                    />
                                </Link>
                                <Card.Body>
                                    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <Card.Title>{movie.original_title}</Card.Title>
                                    </Link>
                                    <div className="favorites-icon">
                                        <i
                                            className={`fas fa-heart${favoritesArr.some((favMovie) => favMovie.id === movie.id) ? ' text-danger' : '-broken text-danger'}`}
                                            style={{ cursor: 'pointer', position: 'absolute', top: '15px', right: '15px', fontSize: '2rem' }}
                                            onClick={() =>
                                                favoritesArr.some((favMovie) => favMovie.id === movie.id)
                                                && dispatch(removeFromFavorites(movie.id))
                                            }
                                        ></i>
                                    </div>
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
