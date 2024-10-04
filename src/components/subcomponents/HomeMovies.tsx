import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../types/Movie";
import { fetchMovies } from "../fetchs/FetchMovies";

const HomeMovies = () => {
    const [movies, setMovies] = useState<Movie[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMovies = async () => {
            const { movies, error } = await fetchMovies(1);
            if (error) {
                console.error("Error fetching movies:", error);
            } else {
                setMovies(movies);
            }
            setLoading(false);
        };
        loadMovies();
    }, []);

    return (
        <>
            <h2 className="text-4xl mt-10 mb-4 font-bold">Movies</h2>
            <p className="text-center text-md mb-7 text-gray-300 max-w-xl">
                Explore a wide variety of movies featuring Batman!
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {movies?.slice(0, 3).map((movie: Movie) => (
                        <Link 
                            to={`/movie/${movie.imdbID}`}
                            key={movie.imdbID} 
                            className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white"
                        >
                            <div className="flex flex-col items-center">
                            <h2 className="text-3xl mb-2 font-bold text-center">{movie.Title}</h2>
                                <img 
                                    src={movie.Poster} 
                                    alt={movie.Title} 
                                    className="w-48 h-72 rounded-lg mb-4 shadow-md" 
                                    onError={(e) => { e.currentTarget.src = "/path/to/fallback-image.jpg"; }} 
                                />
                                <p className="text-lg text-gray-300 mb-1"><strong>Year:</strong> {movie.Year}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Link 
                to="/movies" 
                className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 mb-6 shadow-md"
            >
                View all movies
            </Link>
        </>
    );
    
};

export default HomeMovies;
