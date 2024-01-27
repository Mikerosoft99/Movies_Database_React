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
                    <p><b>Vote Average:</b> {vote_average}</p>
                    <StarsMeter voteAverage={vote_average} />
                    <p><b>Runtime:</b> {runtime} minutes</p>
                    <p><b>Overview:</b> {overview}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default MovieDetails;
