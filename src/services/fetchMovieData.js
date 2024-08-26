import axios from "axios";

import { createMovieData } from "../functions/createMovieData";

const API_KEY = import.meta.env.VITE_API_KEY

async function fetchMovieData(movies) {
    try {
        const searchedPromises = movies.map(title =>
            axios.get('https://api.themoviedb.org/3/search/movie', {
                params: { api_key: API_KEY, query: title }
            })
        );
        const searchedResponse = await Promise.all(searchedPromises);

        const moviesID = searchedResponse.map(response => response.data.results && response.data.results[0]
            ?
            response.data.results[0].id
            :
            null
        ).filter(id => id !== null);

        const moviePromises = moviesID.map(id =>
            axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                params: { api_key: API_KEY, append_to_response: 'credits,videos' }
            })
        )

        const moviesResponses = await Promise.all(moviePromises);

        const movieDetails = moviesResponses.map(response => {
            const movie = response.data;
            return createMovieData(movie)
        });
        return movieDetails
    }
    catch (error) {
        console.error('Error: ', error)
    }
}

export default fetchMovieData;