import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import StarsMeter from '../components/StarMeter';


const MovieDetails = ({ movie }) => {
    const {
        original_title,
        poster_path,
        release_date,
        vote_average,
        overview,
        runtime,
    } = movie;

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
                </Col>
            </Row>
        </Container>
    );
};

export default MovieDetails;
