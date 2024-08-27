import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moviesChangeLanguage } from "../store/slices/moviesSlice";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export const useChangeLanguage = () => {
    const dispatch = useDispatch();
    const movies = useSelector(state => state.movies.movies)

    const handleLanguageClick = async (language) => {
        try {
            const moviesID = movies.map(movie => movie.tmdbID);

            const moviePromises = moviesID.map(id =>
                axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${language}`)
            )
            const moviesResponses = await Promise.all(moviePromises);
            const allMovies = moviesResponses.map(movie => movie.data)

            dispatch(moviesChangeLanguage(allMovies))
        } catch (error) {
            console.error('Error fetching movie data:', error);
        }
    };

    return {
        handleLanguageClick
    }
}