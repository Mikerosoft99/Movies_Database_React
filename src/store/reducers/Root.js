import { combineReducers } from 'redux';
import favoritesReducer from './AddToFav';
import moviesReducer from './MoviesReducer';

// Combine multiple reducers into a single rootReducer
const rootReducer = combineReducers({
    favorites: favoritesReducer,   // State managed by the favoritesReducer
    movies: moviesReducer          // State managed by the moviesReducer
});

export default rootReducer;
