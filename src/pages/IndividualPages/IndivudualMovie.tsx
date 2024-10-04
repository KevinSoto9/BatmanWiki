import { fetchMovie } from "../../components/fetchs/FetchMovies";
import { useEffect, useState } from "react";
import { MovieDetail } from "../../components/types/Movie";
import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadMovie = async () => {
            setLoading(true);
            try {
                const data = await fetchMovie(String(id));
                console.log("Fetched data:", data);

                if (data && data.movie) {
                    setMovie(data.movie);
                } else {
                    console.log("No movie found in the response.");
                    setMovie(null);
                }
            } catch (error) {
                console.error("Error fetching movie:", error);
                setMovie(null);
            } finally {
                setLoading(false);
            }
        };

        loadMovie();
    }, [id]);

    return (
        <div className="flex flex-col items-center min-h-screen w-full bg-gray-800 p-6">
            {movie ? (
                <>
                    <h2 className="text-5xl text-center mb-6 font-bold text-white">
                        {movie.Title || 'No title available'}
                    </h2>
                    <div className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                        <div className="flex flex-col md:flex-row items-center mb-6">
                            <img
                                src={movie.Poster}
                                alt={movie.Title || 'Movie poster'}
                                className="w-64 h-96 rounded-lg mb-4 md:mb-0 md:mr-6 shadow-md"
                                onError={(e) => { e.currentTarget.src = "/path/to/fallback-image.jpg"; }}
                            />
                            <div className="flex-grow">
                                <p className="text-xl text-gray-300 mb-4">{movie.Plot || 'No plot available'}</p>
                                <div className="text-lg text-gray-400">
                                    <p className="mb-2"><strong>Director:</strong> {movie.Director || 'No director available'}</p>
                                    <p className="mb-2"><strong>Year:</strong> {movie.Year || 'No year available'}</p>
                                    <p className="mb-2"><strong>Actors:</strong> {movie.Actors || 'No actors available'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Details</h3>
                            <div className="grid grid-cols-2 gap-1 text-lg text-gray-400">
                                <p><strong>Awards:</strong> {movie.Awards || 'No awards available'}</p>
                                <p><strong>BoxOffice:</strong> {movie.BoxOffice || 'No box office information available'}</p>
                                <p><strong>Country:</strong> {movie.Country || 'No country available'}</p>
                                <p><strong>Language:</strong> {movie.Language || 'No language available'}</p>
                                <p><strong>Metascore:</strong> {movie.Metascore || 'No metascore available'}</p>
                                <p><strong>Rated:</strong> {movie.Rated || 'No rating available'}</p>
                                <p><strong>Released:</strong> {movie.Released || 'No release date available'}</p>
                                <p><strong>Runtime:</strong> {movie.Runtime || 'No runtime available'}</p>
                                <p><strong>Writer:</strong> {movie.Writer || 'No writer available'}</p>
                                <p><strong>imdbRating:</strong> {movie.imdbRating || 'No IMDb rating available'}</p>
                                <p><strong>imdbVotes:</strong> {movie.imdbVotes || 'No IMDb votes available'}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">No movie found.</div>
            )}
        </div>
    );
    
};

export default MovieDetails;
