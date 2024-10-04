import { fetchGames } from "../components/fetchs/FetchGames";
import { useEffect, useState } from "react";
import { Game } from "../components/types/Game";
import { Link } from "react-router-dom";

const Games = () => {
    const [games, setGames] = useState<Game[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); 

    useEffect(() => {
        const loadGames = async () => {
            setLoading(true);
            try {
                const data = await fetchGames(currentPage);
                console.log("Fetched data:", data);

                if (data && Array.isArray(data.games) && data.games.length > 0) {
                    setGames(data.games);
                } else {
                    console.log("No games found in the response.");
                    setGames([]); 
                }
            } catch (error) {
                console.error("Error fetching games:", error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="p-5 font-sans bg-gray-800 text-white min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center text-5xl mb-6 font-bold">Games</h1>
            <p className="text-center text-lg mb-10 text-gray-300 max-w-xl">
                Explore a diverse collection of Batman games showcasing thrilling adventures, iconic villains, and the evolution of the Dark Knight. Discover the captivating stories and stunning gameplay that define this legendary superhero. {/* Updated description */}
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : games.length > 0 ? (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {games.map((game: Game) => (
                        <Link to={`/Game/${game.imdbID}`} key={game.imdbID} className="no-underline">
                            <div className="bg-slate-900 border border-gray-700 h-full rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                            <div className="flex flex-col items-center">
                            <h2 className="text-3xl mb-2 font-bold text-center">{game.Title}</h2> 
                                <img 
                                    src={game.Poster}
                                    alt={game.Title}
                                    className="w-48 h-72 rounded-lg mb-4 shadow-md" 
                                    onError={(e) => { e.currentTarget.src = "../src/assets/image-not-available.jpg"; }} 
                                />
                                <p className="text-lg text-gray-300 mb-1"><strong>Year:</strong> {game.Year}</p> 
                            </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-500">No games found.</div>
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

export default Games; // Updated export
