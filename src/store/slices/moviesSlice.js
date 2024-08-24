import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],  // Initial state with an empty array of movies
    status: 'idle', // Possible values: 'idle', 'loading', 'succeeded', 'failed'
    error: null
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        // Reducer to store fetched movie data
        moviesFetched: (state, action) => {
            state.movies = action.payload;
            state.status = 'succeeded';
        },
        // Reducer to handle loading state
        moviesLoading: (state) => {
            state.status = 'loading';
        },
        // Reducer to handle error state
        moviesFailed: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        movieAdded: (state, action) => {
            state.movies.push(action.payload); // Add the new movie to the movies array
        },
        movieEdited: (state, action) => {
            const updatedMovie = action.payload;
            const existingMovie = state.movies.find(movie => movie.tmdbID === updatedMovie.tmdbID);

            if (existingMovie) {
                Object.assign(existingMovie, updatedMovie);
            }
        },
        movieDeleted: (state, action) => {
            const id = action.payload;
            state.movies = state.movies.filter(movie => movie.tmdbID !== id);
        }
    }
});

export const { moviesFetched, moviesLoading, moviesFailed, movieAdded, movieEdited, movieDeleted } = moviesSlice.actions;

export default moviesSlice.reducer;
