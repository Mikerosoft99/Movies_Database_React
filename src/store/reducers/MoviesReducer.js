// Initial state for the movies feature
const initialState = {
    movies: [],    // Array to store movie data
    error: null,   // Variable to store any error during movie fetching
};

// Redux reducer for handling state changes related to movies
const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        // Action type for successful movie data retrieval
        case 'FETCH_MOVIES_SUCCESS':
            return {
                ...state,
                movies: action.payload,   // Update movies array with retrieved movie data
                error: null,             // Clear any previous error
            };

        // Action type for handling errors during movie data retrieval
        case 'FETCH_MOVIES_ERROR':
            return {
                ...state,
                movies: [],              // Clear movies array in case of an error
                error: action.payload,   // Update error variable with the error message
            };

        // Default case for any other action type
        default:
            return state;
    }
};

// Export the movies reducer for use in the Redux store
export default moviesReducer;
