// Initial state for the favorites feature
const initialState = {
    favorites: [],         // Array to store favorite movies
    favoritesCount: 0,     // Count of favorite movies
};

// Redux reducer for handling state changes related to favorites
const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        // Action type for adding a movie to favorites
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload],    // Add movie to favorites array
                favoritesCount: state.favoritesCount + 1,           // Increment favorites count
            };

        // Action type for removing a movie from favorites
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter((favMovie) => favMovie.id !== action.payload), // Remove movie from favorites array
                favoritesCount: state.favoritesCount - 1,           // Decrement favorites count
            };

        // Default case for any other action type
        default:
            return state;
    }
};

// Export the favorites reducer for use in the Redux store
export default favoritesReducer;
