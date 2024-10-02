import { fetchCharacters, swapCharacterIds } from "../components/fetchs/FetchCharacters";
import { useEffect, useState } from "react";
import Character from "../components/types/Character";
import { Link } from "react-router-dom";

const Characters = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const charactersPerPage = 12;

    useEffect(() => {
        const loadCharacters = async () => {
            setLoading(true);
            try {
                const data = await fetchCharacters(charactersPerPage, currentPage);
                console.log("Fetched data:", data);

                if (Array.isArray(data) && data.length > 0) {
                    const swappedCharacters = swapCharacterIds(data);
                    setCharacters(swappedCharacters);
                } else {
                    console.log("No characters found in the response.");
                    setCharacters([]);
                }
            } catch (error) {
                console.error("Error fetching characters:", error);
                setCharacters([]);
            } finally {
                setLoading(false);
            }
        };

        loadCharacters();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="p-5 font-sans bg-gray-800 text-white min-h-screen w-full flex flex-col items-center">
            <h1 className="text-center text-5xl mb-6 font-bold text-white">Characters</h1>
            <p className="text-center text-lg mb-10 text-gray-300 max-w-xl">
                Dive into the world of Batman and explore a diverse collection of characters. From iconic villains to legendary heroes, discover the thrilling adventures and captivating stories that define the Dark Knight's legacy.
            </p>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : characters.length > 0 ? (
                <div className="flex flex-wrap gap-5 justify-center w-full">
                    {characters.map((character: Character, index: number) => {
                        const characterId = (currentPage - 1) * charactersPerPage + (index + 1);
                        return (
                            <Link to={`/character/${characterId}`} key={character.id} className="no-underline">
                                <div
                                    className="bg-slate-900 border border-gray-700 h-full rounded-lg p-6 w-80 md:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 text-white"
                                >
                                    <h2 className="text-3xl text-center mb-4 font-bold">{character.name}</h2>
                                    <div className="flex flex-col md:flex-row items-center">
                                        <img
                                            src={character.image_url}
                                            alt={character.name}
                                            className="w-48 h-48 rounded-lg mb-4 md:mb-0 md:mr-4 shadow-md"
                                        />
                                        <div className="flex-grow">
                                            <p className="text-base text-gray-300 mb-3">{character.description}</p>
                                            <p className="text-sm text-gray-400"><strong>Alias:</strong> {character.alias}</p>
                                            <p className="text-sm text-gray-400"><strong>Creator:</strong> {character.creator}</p>
                                            <p className="text-sm text-gray-400"><strong>First Appearance:</strong> {character.first_appearance}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center text-gray-500">No characters found.</div>
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
                    className={`bg-blue-800 text-white font-bold py-2 px-4 rounded-lg ${characters.length < charactersPerPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={characters.length < charactersPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Characters;
