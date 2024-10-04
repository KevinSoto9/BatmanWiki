import { fetchMovies } from "../components/fetchs/FetchMovies";
import { useEffect, useState } from "react";
import { Movie } from "../components/types/Movie";
import { Link } from "react-router-dom";

const Movies = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); 

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);
            try {
                const data = await fetchMovies(currentPage);
                console.log("Fetched data:", data);

                if (data && Array.isArray(data.movies) && data.movies.length > 0) {
                    setMovies(data.movies);
                } else {
                    console.log("No movies found in the response.");
                    setMovies([]);
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="p-5 font-sans bg-gray-800 text-white min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center text-5xl mb-6 font-bold">Movies</h1>
            <p className="text-center text-lg mb-10 text-gray-300 max-w-xl">
                Explore a diverse collection of Batman movies showcasing thrilling adventures, iconic villains, and the evolution of the Dark Knight. Discover the captivating stories and stunning cinematography that define this legendary superhero.
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : movies.length > 0 ? (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {movies.map((movie: Movie) => (
                        <Link to={`/Movie/${movie.imdbID}`} key={movie.imdbID} className="no-underline">
                            <div className="bg-slate-900 border border-gray-700 h-full rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
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
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No movies found.</div>
            )}
            <div className="flex justify-between w-full mt-5">
                <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className={`bg-blue-800 text-white font-bold py-2 px-4 rounded-lg ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <button
                    onClick={handleNextPage}
                    className="bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Movies;
