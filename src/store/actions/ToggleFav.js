// Action creator for adding a movie to favorites
export const addToFavorites = (movieId) => ({
    type: 'ADD_TO_FAVORITES',  // Action type indicating addition to favorites
    payload: movieId,          // Payload containing the ID of the movie to be added
});

// Action creator for removing a movie from favorites
export const removeFromFavorites = (movieId) => ({
    type: 'REMOVE_FROM_FAVORITES', // Action type indicating removal from favorites
    payload: movieId,              // Payload containing the ID of the movie to be removed
});
