import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MovieDetails from '../pages/MovieDetails';

function Movie() {
    const [movie, setMovie] = useState({});
    const { movieId } = useParams();

    useEffect(() => {
        const apiKey = "8905e08e3a3707818f8ff36e0dc4df18";

        axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
            .then(response => {
                setMovie(response.data);
                // console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [movieId]);

    return (
        <>
            <MovieDetails movie={movie} />
        </>
    );
}

export default Movie;
