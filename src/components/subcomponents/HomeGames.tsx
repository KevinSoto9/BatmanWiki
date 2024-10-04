import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "../types/Game";
import { fetchGames } from "../fetchs/FetchGames"; // Assuming you have a fetchGames function

const HomeGames = () => {
    const [games, setGames] = useState<Game[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadGames = async () => {
            const { games, error } = await fetchGames(1);
            if (error) {
                console.error("Error fetching games:", error);
            } else {
                setGames(games);
            }
            setLoading(false);
        };
        loadGames();
    }, []);

    if (loading) {
        return <div className="text-center bg-gray-800 min-h-screen text-white">Loading...</div>;
    }

    return (
        <>
            <h2 className="text-4xl mt-10 mb-4 font-bold">Games</h2>
            <p className="text-center text-md mb-7 text-gray-300 max-w-xl">
                Explore a wide variety of games featuring Batman!
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {games?.slice(0, 3).map((game: Game) => (
                        <Link 
                            to={`/game/${game.imdbID}`} 
                            key={game.imdbID} 
                            className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white"
                        >
                            <div className="flex flex-col items-center">
                                <h2 className="text-3xl mb-2 font-bold text-center">{game.Title}</h2>
                                <img 
                                    src={game.Poster} 
                                    alt={game.Title} 
                                    className="w-48 h-72 rounded-lg mb-4 shadow-md" 
                                    onError={(e) => { e.currentTarget.src = "/path/to/fallback-image.jpg"; }} 
                                />
                                <p className="text-lg text-gray-300 mb-1"><strong>Year:</strong> {game.Year}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
            <Link 
                to="/games" 
                className="bg-blue-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-110 mt-10 mb-6 shadow-md"
            >
                View all games
            </Link>
        </>
    );
};

export default HomeGames;
