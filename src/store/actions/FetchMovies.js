// Action creator for successful movie data retrieval
export const fetchMoviesSuccess = (movies) => ({
  type: 'FETCH_MOVIES_SUCCESS',   // Action type indicating successful fetch
  payload: movies,                // Payload containing the retrieved movies
});

// Action creator for handling errors during movie data retrieval
export const fetchMoviesError = (error) => ({
  type: 'FETCH_MOVIES_ERROR',     // Action type indicating error during fetch
  payload: error,                 // Payload containing the error information
});
