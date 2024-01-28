export const addToFavorites = (movieId) => ({
    type: 'ADD_TO_FAVORITES',
    payload: movieId,
});

export const removeFromFavorites = (movieId) => ({
    type: 'REMOVE_FROM_FAVORITES',
    payload: movieId,
});