import { fetchGame } from "../../components/fetchs/FetchGames";
import { useEffect, useState } from "react";
import { GameDetail } from "../../components/types/Game";
import { useParams } from "react-router-dom";

const GameDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [game, setGame] = useState<GameDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadGame = async () => {
            setLoading(true);
            try {
                const data = await fetchGame(String(id));
                console.log("Fetched data:", data);
                window.scrollTo(0, 0);

                if (data && data.game) {
                    setGame(data.game);
                } else {
                    console.log("No game found in the response.");
                    setGame(null);
                }
            } catch (error) {
                console.error("Error fetching game:", error);
                setGame(null);
            } finally {
                setLoading(false);
            }
        };

        loadGame();
    }, [id]);

    if (loading) {
        return <div className="text-center bg-gray-800 min-h-screen text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen w-full bg-gray-800 p-6">
            {game ? (
                <>
                    <h2 className="text-5xl text-center mb-6 font-bold text-white">
                        {game.Title || 'No title available'}
                    </h2>
                    <div className="bg-slate-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white">
                        <div className="flex flex-col md:flex-row items-center mb-6">
                            <img
                                src={game.Poster}
                                alt={game.Title || 'Game poster'}
                                className="w-64 h-96 rounded-lg mb-4 md:mb-0 md:mr-6 shadow-md"
                                onError={(e) => { e.currentTarget.src = "../src/assets/image-not-available.jpg"; }}
                            />
                            <div className="flex-grow">
                                <p className="text-xl text-gray-300 mb-4">{game.Plot || 'No plot available'}</p>
                                <div className="text-lg text-gray-400">
                                    <p className="mb-2"><strong>Year:</strong> {game.Year || 'No year available'}</p>
                                    <p className="mb-2"><strong>Actors:</strong> {game.Actors || 'No actors available'}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-2xl font-semibold mb-4">Details</h3>
                            <div className="grid grid-cols-2 gap-1 text-lg text-gray-400">
                                <p><strong>Awards:</strong> {game.Awards || 'No awards available'}</p>
                                <p><strong>BoxOffice:</strong> {game.BoxOffice || 'No box office information available'}</p>
                                <p><strong>Country:</strong> {game.Country || 'No country available'}</p>
                                <p><strong>Language:</strong> {game.Language || 'No language available'}</p>
                                <p><strong>Metascore:</strong> {game.Metascore || 'No metascore available'}</p>
                                <p><strong>Rated:</strong> {game.Rated || 'No rating available'}</p>
                                <p><strong>Released:</strong> {game.Released || 'No release date available'}</p>
                                <p><strong>Runtime:</strong> {game.Runtime || 'No runtime available'}</p>
                                <p><strong>Writer:</strong> {game.Writer || 'No writer available'}</p>
                                <p><strong>imdbRating:</strong> {game.imdbRating || 'No IMDb rating available'}</p>
                                <p><strong>imdbVotes:</strong> {game.imdbVotes || 'No IMDb votes available'}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className="text-center text-gray-500">No game found.</div>
            )}
        </div>
    );
};

export default GameDetails;
