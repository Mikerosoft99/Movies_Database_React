import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import StarsMeter from '../components/StarMeter';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../store/actions/ToggleFav';


const MovieDetails = ({ movie }) => {
    // Destructuring movie details
    const {
        original_title,
        poster_path,
        release_date,
        vote_average,
        overview,
        runtime,
    } = movie;

    const dispatch = useDispatch();
    const favoritesArr = useSelector((state) => state.favorites.favorites);
    
    // Generate the image URL based on poster_path
    const imageUrl = poster_path
        ? `https://image.tmdb.org/t/p/w500/${poster_path}`
        : `${process.env.PUBLIC_URL}/movie-poster-notfound.jpg`;

    return (
        <Container className="movie-details-container bg-dark text-light p-4">
            <Row>
                <Col md={4} className="movie-image">
                    <img
                        src={imageUrl}
                        alt={original_title}
                        className="img-fluid movieimage"
                    />
                </Col>
                <Col md={8} className="movie-info">
                    <h2>{original_title}</h2>
                    <p><b>Release Date:</b> {release_date}</p>
                    <p><b>Rating:</b> <span id='vote-average'> {vote_average !== undefined && vote_average.toFixed(1)} </span><sup>/10</sup></p>
                    <StarsMeter voteAverage={vote_average} />
                    <p className='my-2'><b>Runtime:</b> {runtime} minutes</p>
                    <p style={{ lineHeight: '1.8' }}><b>Overview:</b> {overview}</p>
                    <Button
                        className='mt-3'
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
                </Col>
            </Row>
        </Container>
    );
};

export default MovieDetails;
