import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieAdded } from "../store/slices/moviesSlice";
import axios from "axios";

import { createMovieData } from "../functions/createMovieData";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useSearchMovieData = () => {
    const [suggestions, setSuggestions] = useState([]);
    const dispatch = useDispatch();
    const existingMovies = useSelector(state => state.movies.movies)

    const fetchSuggestions = async (query) => {
        if (query.length < 2) return;
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: { api_key: API_KEY, query: query }
            });
            setSuggestions(response.data.results);
        } catch (error) {
            console.error('Error fetching movie suggestions:', error);
        }
    };

    const handleSuggestionClick = async (movieId) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                params: { api_key: API_KEY, append_to_response: 'credits,videos' }
            });
            const movieDetails = createMovieData(response.data);
            const isMovieExist = existingMovies.some(movie => movie.tmdbID === movieDetails.tmdbID);

            if (!isMovieExist) {
                dispatch(movieAdded(movieDetails));
            }

            setSuggestions([]);
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    return {
        fetchSuggestions,
        handleSuggestionClick,
        suggestions
    }
}