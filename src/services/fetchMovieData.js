import axios from "axios";

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

        // Change return data with function createMovieData
        const movieDetails = moviesResponses.map(response => {
            const movie = response.data;
            return {
                tmdbID: movie.id,
                title: movie.title,
                overview: movie.overview,
                actors: movie.credits.cast.slice(0, 10).map(actor => actor.name).join(', '),
                genres: movie.genres.map((genre) => genre.name),
                poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null,
                release: movie.release_date,
                rating: movie.vote_average,
                trailer: movie.videos.results[0].key ? `https://www.youtube.com/watch?v=${movie.videos.results[0].key}` : null,
                director: movie.credits.crew.find(crewMember => crewMember.job === 'Director')?.name,
                duration: movie.runtime,
            }
        });
        return movieDetails
    }
    catch (error) {
        console.error('Error: ', error)
    }
}

export default fetchMovieData;