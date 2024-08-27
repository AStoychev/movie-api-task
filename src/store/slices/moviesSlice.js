import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    movies: [],
    status: 'idle',
    error: null
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        moviesFetched: (state, action) => {
            state.movies = action.payload;
            state.status = 'succeeded';
        },
        moviesLoading: (state) => {
            state.status = 'loading';
        },
        moviesFailed: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
        movieAdded: (state, action) => {
            state.movies.push(action.payload);
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
        },
        moviesReordered: (state, action) => {
            state.movies = action.payload;
        },
        moviesChangeLanguage: (state, action) => {
            const updates = action.payload;
            updates.forEach(update => {
                const { id, title, overview } = update;
                const existingMovie = state.movies.find(movie => movie.tmdbID === id);
                if (existingMovie) {
                    existingMovie.title = title;
                    existingMovie.overview = overview;
                }
            });
        }
    }
});

export const { moviesFetched, moviesLoading, moviesFailed, movieAdded, movieEdited, movieDeleted, moviesReordered, moviesChangeLanguage } = moviesSlice.actions;

export default moviesSlice.reducer;
